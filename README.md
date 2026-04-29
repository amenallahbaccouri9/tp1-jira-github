# Portail Tuteur - Comptes Rendus
## User Story
"En tant que tuteur, je peux consulter les comptes rendus déposés par les étudiants afin de suivre l'évolution du projet"

---

## Structure du projet
```
comptes-rendus/
├── frontend/
│   ├── index.html       ← Page principale (login + dashboard)
│   ├── style.css        ← Styles CSS
│   └── app.js           ← Logique JavaScript
├── backend/
│   ├── db.php           ← Connexion base de données
│   ├── login.php        ← API login tuteur
│   └── get_reports.php  ← API récupération comptes rendus
├── database/
│   └── comptes_rendus_db.sql  ← Script SQL à importer
└── README.md
```

---

## Installation avec XAMPP

### Étape 1 - Installer XAMPP
- Télécharger XAMPP sur https://www.apachefriends.org
- Installer et lancer **Apache** + **MySQL**

### Étape 2 - Copier les fichiers
- Copier tout le dossier `comptes-rendus/` dans `C:\xampp\htdocs\`

### Étape 3 - Créer la base de données
1. Ouvrir http://localhost/phpmyadmin
2. Cliquer sur **"Nouvelle base de données"** → Non: `comptes_rendus_db` → Créer
3. Cliquer sur **"Importer"**
4. Choisir le fichier `database/comptes_rendus_db.sql`
5. Cliquer sur **"Exécuter"**

### Étape 4 - Lancer le projet
- Ouvrir http://localhost/comptes-rendus/frontend/index.html

---

## Compte de connexion
| Email | Mot de passe |
|-------|-------------|
| tuteur@test.com | 1234 |

---

## Mode démo
Si XAMPP n'est pas installé, le site fonctionne quand même en **mode démo**
avec des données fictives directement dans le navigateur.
