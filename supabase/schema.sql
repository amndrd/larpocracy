-- ============================================================
-- LARPOCRACY — schéma initial
-- À exécuter dans Supabase : SQL Editor → New query → Run.
-- Idempotent : peut être rejoué sans casse.
-- ============================================================

-- ---------- 1. Profils ----------
-- Une ligne par compte. `plan` prépare l'abonnement (étape 6).
create table if not exists public.profiles (
  id            uuid primary key references auth.users on delete cascade,
  email         text,
  display_name  text,
  plan          text not null default 'free' check (plan in ('free', 'pro')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.profiles is 'Profil applicatif, en miroir de auth.users.';
comment on column public.profiles.plan is 'free | pro — sert au futur abonnement Stripe.';

-- ---------- 2. Progression ----------
-- Une ligne par (utilisateur, fiche lue).
create table if not exists public.card_progress (
  user_id       uuid not null references auth.users on delete cascade,
  domain_id     text not null,
  card_id       text not null,
  read_at       timestamptz not null default now(),
  quiz_correct  smallint,
  quiz_total    smallint,
  primary key (user_id, card_id)
);

create index if not exists card_progress_user_domain_idx
  on public.card_progress (user_id, domain_id);

comment on table public.card_progress is 'Fiches lues et scores de quiz, par utilisateur.';

-- ---------- 3. Row Level Security ----------
-- Sans ces règles, la clé publique laisserait lire toutes les lignes.
alter table public.profiles      enable row level security;
alter table public.card_progress enable row level security;

drop policy if exists "profil : lecture de son propre profil" on public.profiles;
create policy "profil : lecture de son propre profil"
  on public.profiles for select
  using ((select auth.uid()) = id);

drop policy if exists "profil : mise à jour de son propre profil" on public.profiles;
create policy "profil : mise à jour de son propre profil"
  on public.profiles for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Volontairement pas de policy INSERT ni DELETE sur profiles :
-- la création passe par le trigger ci-dessous, la suppression par la cascade
-- depuis auth.users. Personne ne crée ni ne supprime un profil à la main.

drop policy if exists "progression : lecture de la sienne" on public.card_progress;
create policy "progression : lecture de la sienne"
  on public.card_progress for select
  using ((select auth.uid()) = user_id);

drop policy if exists "progression : écriture de la sienne" on public.card_progress;
create policy "progression : écriture de la sienne"
  on public.card_progress for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "progression : mise à jour de la sienne" on public.card_progress;
create policy "progression : mise à jour de la sienne"
  on public.card_progress for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "progression : suppression de la sienne" on public.card_progress;
create policy "progression : suppression de la sienne"
  on public.card_progress for delete
  using ((select auth.uid()) = user_id);

-- ---------- 4. Création automatique du profil ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- 5. updated_at ----------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ============================================================
-- Ajout du 26 août 2026 — progression jouée (XP, série, cartes)
-- Rejouable : ne casse rien si le schéma initial est déjà en place.
-- ============================================================

-- ---------- 6. Cartes acquises ----------
-- Le mode Cartes produit un résultat qu'on veut conserver, au même titre
-- que le score de quiz. On ne garde que le meilleur.
alter table public.card_progress add column if not exists cards_known smallint;
alter table public.card_progress add column if not exists cards_total smallint;

comment on column public.card_progress.cards_known is 'Cartes jugées « je savais » au meilleur passage.';

-- ---------- 7. Jours d'activité ----------
-- Une ligne par jour où l'utilisateur a fait quelque chose. C'est ce qui
-- permet une série honnête : `card_progress.read_at` ne conserve que la
-- dernière lecture d'une fiche et perdrait l'historique en cas de relecture.
create table if not exists public.activity_days (
  user_id  uuid not null references auth.users on delete cascade,
  day      date not null,
  primary key (user_id, day)
);

comment on table public.activity_days is 'Un jour d''activité par ligne : sert à calculer la série.';

alter table public.activity_days enable row level security;

drop policy if exists "activité : lecture de la sienne" on public.activity_days;
create policy "activité : lecture de la sienne"
  on public.activity_days for select
  using ((select auth.uid()) = user_id);

drop policy if exists "activité : écriture de la sienne" on public.activity_days;
create policy "activité : écriture de la sienne"
  on public.activity_days for insert
  with check ((select auth.uid()) = user_id);
