-- Migration: Changer le type de la colonne experience de TEXT à JSONB
-- Permet de stocker un tableau d'expériences professionnelles structuré

-- Étape 1: Créer une nouvelle colonne temporaire de type JSONB
ALTER TABLE profiles ADD COLUMN experience_new JSONB;

-- Étape 2: Migrer les données existantes
-- Si experience contient déjà du JSON valide, le parser
-- Sinon, créer un tableau vide
UPDATE profiles 
SET experience_new = CASE 
  WHEN experience IS NULL OR experience = '' THEN '[]'::jsonb
  WHEN experience::text ~ '^\[.*\]$' THEN experience::jsonb
  ELSE jsonb_build_array(jsonb_build_object('title', experience, 'yearStart', '', 'yearEnd', '', 'description', ''))
END;

-- Étape 3: Supprimer l'ancienne colonne
ALTER TABLE profiles DROP COLUMN experience;

-- Étape 4: Renommer la nouvelle colonne
ALTER TABLE profiles RENAME COLUMN experience_new TO experience;

-- Vérification
SELECT id, first_name, last_name, experience FROM profiles WHERE user_type = 'marronneur';
