// Chatbot IA Marronner - Assistant virtuel pour aider clients et marronneurs
(function() {
  'use strict';
  
  // Base de connaissances Q&A
  const knowledgeBase = [
    {
      keywords: ['comment', 'publier', 'demande', 'poster', 'créer'],
      question: "Comment publier une demande ?",
      answer: "Pour publier une demande sur Marronner :\n1. Clique sur 'Publier une demande' dans le menu\n2. Connecte-toi ou inscris-toi si ce n'est pas déjà fait\n3. Remplis le formulaire avec le titre, la description, le budget et la catégorie\n4. Valide pour publier - les marronneurs pourront voir ta demande immédiatement !"
    },
    {
      keywords: ['devenir', 'marronneur', 'freelance', 'inscription', 'rejoindre'],
      question: "Comment devenir marronneur ?",
      answer: "Pour devenir marronneur sur la plateforme :\n1. Clique sur 'S'inscrire' en haut à droite\n2. Choisis le type 'Marronneur' (⚡)\n3. Remplis ton profil avec tes compétences et ton expérience\n4. Une fois inscrit, tu pourras répondre aux demandes et gagner de l'argent localement à La Réunion !"
    },
    {
      keywords: ['paiement', 'payer', 'prix', 'budget', 'argent', 'transaction'],
      question: "Comment fonctionne le paiement ?",
      answer: "Le système de paiement Marronner :\n• Le chercheur définit son budget dans la demande\n• Le marronneur propose son prix en répondant\n• Le paiement est sécurisé via notre plateforme\n• Le règlement est effectué une fois le travail validé\n• Tous les paiements sont protégés pour votre sécurité 💳"
    },
    {
      keywords: ['contacter', 'message', 'parler', 'discuter', 'messagerie'],
      question: "Comment contacter un marronneur ?",
      answer: "Pour contacter un marronneur :\n1. Consulte sa proposition sur ta demande\n2. Clique sur son profil pour voir ses détails\n3. Utilise le bouton 'Contacter' pour envoyer un message\n4. Vous pourrez discuter dans la messagerie intégrée\n5. Accède à tes conversations dans 'Messagerie' 💬"
    },
    {
      keywords: ['connexion', 'connecter', 'login', 'mot de passe', 'problème'],
      question: "Problème de connexion ?",
      answer: "Si tu as un problème de connexion :\n• Vérifie que ton email et mot de passe sont corrects\n• Utilise 'Mot de passe oublié' si besoin\n• Assure-toi d'avoir validé ton email lors de l'inscription\n• Essaie de vider le cache de ton navigateur (Ctrl+Shift+Del)\n• Si le problème persiste, contacte-nous via la page Contact 🔑"
    },
    {
      keywords: ['messages', 'conversation', 'voir', 'où', 'trouver'],
      question: "Où voir mes messages ?",
      answer: "Pour accéder à tes messages :\n1. Connecte-toi à ton compte\n2. Clique sur 'Messagerie' dans le menu (ou ton profil)\n3. Tu verras toutes tes conversations avec chercheurs ou marronneurs\n4. Tu recevras des notifications pour les nouveaux messages 📧"
    },
    {
      keywords: ['catégories', 'services', 'types', 'quoi', 'proposer'],
      question: "Quelles sont les catégories disponibles ?",
      answer: "Marronner propose de nombreuses catégories :\n🎨 Graphisme & Design\n💻 Développement Web\n📱 Marketing Digital\n✍️ Rédaction & Traduction\n📸 Photo & Vidéo\n🎵 Audio & Musique\n🏗️ Bricolage & Rénovation\n🚗 Transport & Livraison\n... et bien d'autres ! Explore la page Catégories pour tout voir."
    },
    {
      keywords: ['profil', 'compte', 'modifier', 'changer', 'informations'],
      question: "Comment modifier mon profil ?",
      answer: "Pour modifier ton profil :\n1. Connecte-toi à ton compte\n2. Clique sur ton nom/icône en haut à droite\n3. Va dans 'Tableau de bord'\n4. Clique sur 'Profil' pour éditer tes informations\n5. Modifie tes compétences, ta bio, ton portfolio, etc.\n6. N'oublie pas de sauvegarder ! ⚙️"
    },
    {
      keywords: ['avis', 'note', 'évaluation', 'commentaire', 'réputation'],
      question: "Comment fonctionnent les avis ?",
      answer: "Le système d'avis Marronner :\n• Après une mission, le chercheur peut laisser un avis au marronneur\n• Les avis incluent une note (⭐) et un commentaire\n• Tous les avis sont visibles sur le profil du marronneur\n• Plus tu as d'avis positifs, plus tu es visible\n• Sois professionnel pour obtenir 5 étoiles ! ⭐⭐⭐⭐⭐"
    },
    {
      keywords: ['commencer', 'aide', 'guide', 'tutoriel', 'démarrer'],
      question: "Comment bien démarrer ?",
      answer: "Guide de démarrage Marronner :\n📌 Chercheur :\n1. Inscris-toi comme 'Chercheur'\n2. Publie ta demande avec détails et budget\n3. Reçois des propositions de marronneurs\n4. Choisis le meilleur profil et discute\n\n⚡ Marronneur :\n1. Inscris-toi comme 'Marronneur'\n2. Complète ton profil avec tes compétences\n3. Réponds aux demandes qui t'intéressent\n4. Décroches des missions locales !"
    }
  ];

  // Suggestions rapides
  const quickSuggestions = [
    "Comment publier une demande ?",
    "Comment devenir marronneur ?",
    "Comment fonctionne le paiement ?",
    "Où voir mes messages ?"
  ];

  let chatOpen = false;
  let conversationHistory = [];

  // Fonction pour trouver la meilleure réponse
  function findBestAnswer(userInput) {
    const input = userInput.toLowerCase().trim();
    
    if (!input) {
      return {
        question: "Besoin d'aide ?",
        answer: "Pose-moi une question sur Marronner ! Par exemple :\n• Comment publier une demande ?\n• Comment devenir marronneur ?\n• Comment fonctionne le paiement ?\n\nJe suis là pour t'aider ! 😊"
      };
    }

    // Recherche dans la base de connaissances
    let bestMatch = null;
    let bestScore = 0;

    for (const entry of knowledgeBase) {
      let score = 0;
      for (const keyword of entry.keywords) {
        if (input.includes(keyword)) {
          score++;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = entry;
      }
    }

    if (bestMatch && bestScore > 0) {
      return bestMatch;
    }

    // Réponse par défaut
    return {
      question: "Je n'ai pas compris 🤔",
      answer: "Désolé, je n'ai pas bien compris ta question. Voici ce que je peux t'expliquer :\n\n" +
              quickSuggestions.map(q => `• ${q}`).join('\n') +
              "\n\nOu contacte notre support via la page Contact pour une aide personnalisée !"
    };
  }

  // Fonction pour ajouter un message au chat
  function addMessage(text, isBot = true, isQuestion = false) {
    const messagesContainer = document.getElementById('chatbotMessages');
    if (!messagesContainer) return;

    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isBot ? 'bot-message' : 'user-message'}`;
    
    if (isQuestion && isBot) {
      messageDiv.innerHTML = `<strong>${text}</strong>`;
    } else {
      messageDiv.textContent = text;
    }

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    conversationHistory.push({ text, isBot, isQuestion });
  }

  // Fonction pour gérer l'envoi de message
  function sendMessage() {
    const input = document.getElementById('chatbotInput');
    if (!input) return;

    const userMessage = input.value.trim();
    if (!userMessage) return;

    // Ajouter le message utilisateur
    addMessage(userMessage, false);
    input.value = '';

    // Simuler un délai de réponse (effet de typing)
    setTimeout(() => {
      const response = findBestAnswer(userMessage);
      
      // Ajouter la question trouvée
      if (response.question) {
        addMessage(response.question, true, true);
      }
      
      // Ajouter la réponse
      setTimeout(() => {
        addMessage(response.answer, true);
      }, 300);
    }, 500);
  }

  // Fonction pour ajouter une suggestion rapide
  function addQuickSuggestion(question) {
    addMessage(question, false);
    
    setTimeout(() => {
      const response = findBestAnswer(question);
      if (response.question) {
        addMessage(response.question, true, true);
      }
      setTimeout(() => {
        addMessage(response.answer, true);
      }, 300);
    }, 500);
  }

  // Fonction pour toggle le chat
  function toggleChat() {
    const chatPanel = document.getElementById('chatbotPanel');
    if (!chatPanel) return;

    chatOpen = !chatOpen;
    
    if (chatOpen) {
      chatPanel.style.display = 'flex';
      setTimeout(() => {
        chatPanel.classList.add('active');
      }, 10);

      // Message de bienvenue si première ouverture
      if (conversationHistory.length === 0) {
        setTimeout(() => {
          addMessage("Bonjour ! 👋 Je suis l'assistant Marronner. Comment puis-je t'aider aujourd'hui ?", true);
          
          // Ajouter les suggestions
          setTimeout(() => {
            const suggestionsContainer = document.getElementById('chatbotSuggestions');
            if (suggestionsContainer && suggestionsContainer.children.length === 0) {
              quickSuggestions.forEach(suggestion => {
                const btn = document.createElement('button');
                btn.className = 'suggestion-btn';
                btn.textContent = suggestion;
                btn.onclick = () => {
                  addQuickSuggestion(suggestion);
                  suggestionsContainer.style.display = 'none';
                };
                suggestionsContainer.appendChild(btn);
              });
            }
          }, 500);
        }, 300);
      }
    } else {
      chatPanel.classList.remove('active');
      setTimeout(() => {
        chatPanel.style.display = 'none';
      }, 300);
    }
  }

  // Fonction pour fermer le chat en cliquant à l'extérieur
  function handleOutsideClick(event) {
    const chatPanel = document.getElementById('chatbotPanel');
    const chatButton = document.getElementById('chatbotButton');
    
    if (chatOpen && chatPanel && chatButton) {
      if (!chatPanel.contains(event.target) && !chatButton.contains(event.target)) {
        toggleChat();
      }
    }
  }

  // Initialisation au chargement du DOM
  document.addEventListener('DOMContentLoaded', function() {
    const chatButton = document.getElementById('chatbotButton');
    const closeButton = document.getElementById('chatbotClose');
    const sendButton = document.getElementById('chatbotSend');
    const input = document.getElementById('chatbotInput');

    if (chatButton) {
      chatButton.addEventListener('click', toggleChat);
    }

    if (closeButton) {
      closeButton.addEventListener('click', toggleChat);
    }

    if (sendButton) {
      sendButton.addEventListener('click', sendMessage);
    }

    if (input) {
      input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    }

    // Fermer en cliquant à l'extérieur
    document.addEventListener('click', handleOutsideClick);
  });

})();
