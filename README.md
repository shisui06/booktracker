📚 Book Tracker

Book Tracker est une application web permettant de suivre ses lectures, enregistrer des notes personnelles et visualiser sa progression.
Elle aide les utilisateurs à garder une trace des livres lus, à noter leurs impressions, et à rechercher de nouveaux titres via l’API Google Books.

Ce projet a été conçu pour consolider mes compétences en JavaScript, Node.js, MongoDB et intégration d’API externes.

🚀 Fonctionnalités principales

🔐 Système d’authentification utilisateur (via JWT ou Supabase Auth)

📖 Ajout de livres manuellement ou via recherche Google Books

🖼️ Affichage automatique de la couverture du livre (Google Books API)

📝 Sauvegarde de notes personnelles sur chaque livre

⭐ Suivi de lecture (statut : en cours, terminé, à lire)

📊 Statistiques de lecture (nombre total de livres lus, pages lues, etc.)

☁️ Stockage des données dans MongoDB Atlas

🎨 Interface claire et responsive avec Tailwind CSS

🚀 Déploiement sur Vercel

🧠 Stack technique
Catégorie	Technologies
Front-end	HTML, CSS, JavaScript (Vanilla JS)
Back-end	Node.js, Express.js
Base de données	MongoDB Atlas
API externe	Google Books API
Authentification	JWT (ou Supabase Auth selon implémentation)
Déploiement	Vercel
Outils	GitHub, npm, Postman
⚙️ Installation locale

Cloner le dépôt

git clone https://github.com/ton-utilisateur/booktracker.git
cd booktracker


Installer les dépendances

npm install


Configurer l’environnement
Crée un fichier .env à la racine :

MONGO_URI=your_mongodb_connection_string
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
JWT_SECRET=your_jwt_secret


Lancer le serveur

npm run dev

📡 API Google Books

Recherche d’un livre :

GET https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=YOUR_API_KEY


Réponse exemple :

{
  "items": [
    {
      "volumeInfo": {
        "title": "Harry Potter and the Philosopher's Stone",
        "authors": ["J.K. Rowling"],
        "imageLinks": {
          "thumbnail": "https://books.google.com/books/content?id=..."
        }
      }
    }
  ]
}

💡 Améliorations futures

Ajout d’un système de tags ou de catégories

Intégration d’un mode social (partage de lecture entre amis)

Ajout d’un dashboard de statistiques

Système de recommandation intelligente selon les livres lus

Support PWA (Progressive Web App)

🧑‍💻 Auteur

[Ton nom complet]
Étudiant en développement web | Montréal, QC
📧 Contact : [tonemail@email.com
]
🌐 Portfolio : [tonportfolio.vercel.app]