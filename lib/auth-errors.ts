/**
 * Traduit les erreurs Supabase en messages lisibles.
 * Sans cela, l'utilisateur reçoit des chaînes anglaises et techniques
 * telles que « email rate limit exceeded ».
 */
export function authMessage(code: string | undefined, raw: string): string {
  const key = (code ?? '').toLowerCase();
  const text = raw.toLowerCase();

  const has = (...needles: string[]) =>
    needles.some((n) => key.includes(n) || text.includes(n));

  if (has('over_email_send_rate_limit', 'email rate limit', 'rate limit'))
    return "Trop de tentatives d'affilée. Patientez quelques minutes avant de réessayer.";

  if (has('user_already_exists', 'already registered', 'already been registered'))
    return 'Un compte existe déjà avec cette adresse. Essayez de vous connecter.';

  if (has('weak_password', 'password should be'))
    return 'Mot de passe trop faible : choisissez-en un plus long.';

  if (has('invalid format', 'invalid email', 'email_address_invalid'))
    return "Cette adresse email n'a pas l'air valide.";

  if (has('email_not_confirmed', 'email not confirmed'))
    return "Votre adresse n'est pas encore confirmée. Vérifiez votre boîte mail.";

  if (has('signup_disabled', 'signups not allowed'))
    return 'Les inscriptions sont fermées pour le moment.';

  if (has('failed to fetch', 'network', 'fetch failed'))
    return 'Connexion au serveur impossible. Réessayez dans un instant.';

  // Signature d'une clé mal recopiée dans les variables d'environnement :
  // le message doit désigner la configuration, pas l'utilisateur, sinon
  // le défaut se cherche du mauvais côté.
  if (has('invalid_api_key', 'invalid api key', 'no api key'))
    return "Le service d'authentification refuse la configuration du site. Signalez-le.";

  // Repli : on n'expose pas la chaîne brute, qui n'aide personne.
  return "Impossible d'aboutir. Réessayez, et si cela persiste, signalez-le.";
}
