-- 🔍 DIAGNOSTIC RLS POUR TABLE PROFILES
-- Exécute ce script dans l'éditeur SQL de Supabase pour voir l'état RLS

-- 1. Vérifier si RLS est activé
SELECT 
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables 
WHERE tablename = 'profiles';

-- 2. Lister toutes les policies sur la table profiles
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'profiles';

-- 3. Si RLS est activé et bloque les requêtes, le DÉSACTIVER temporairement
-- Décommente cette ligne si tu veux désactiver RLS :
-- ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- 4. Vérifier que ton utilisateur a bien un profil
SELECT 
  id,
  email,
  first_name,
  last_name,
  user_type,
  onboarding_completed,
  created_at
FROM profiles 
WHERE id = '4771d648-bac7-48b5-84a9-90a8fc9be188';

-- 5. Si la requête ci-dessus prend plus de 5 secondes, RLS bloque probablement
-- Dans ce cas, désactive RLS avec :
-- ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
