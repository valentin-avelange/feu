let stream; // Déclaration d'une variable globale pour stocker le flux vidéo
let currentCamera = 'environment'; // Stocker l'état actuel de la caméra

document.getElementById('start-button').addEventListener('click', () => {
    const videoElement = document.getElementById('live-video');

    // Vérifier si le flux vidéo est déjà en cours
    if (stream) {
        // Arrêter le flux vidéo
        stream.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null; // Effacer la source vidéo
        stream = null; // Réinitialiser la variable de flux
        document.querySelector('.video-container').style.display = 'none'; // Cacher le conteneur vidéo
        return; // Arrêter l'exécution de la fonction
    }

    const constraints = {
        video: {
            facingMode: currentCamera // Utiliser la caméra frontale ou arrière selon l'état actuel
        }
    };

    // Accès à la caméra et streaming du flux vidéo
    navigator.mediaDevices.getUserMedia(constraints)
        .then(newStream => {
            stream = newStream; // Stocker le flux vidéo dans la variable globale
            videoElement.srcObject = stream;
            document.querySelector('.video-container').style.display = 'block';
        })
        .catch(error => {
            console.error('Error accessing camera:', error);
        });
});

// Fonction pour basculer entre la caméra frontale et arrière
document.getElementById('toggle-camera-button').addEventListener('click', () => {
    if (currentCamera === 'environment') {
        currentCamera = 'user'; // Changer à la caméra frontale
    } else {
        currentCamera = 'environment'; // Changer à la caméra arrière
    }

    // Si le flux vidéo est actuellement en cours, redémarrer avec la nouvelle caméra
    if (stream) {
        // Arrêter le flux vidéo
        stream.getTracks().forEach(track => track.stop());
        document.getElementById('start-button').click(); // Déclencher le clic sur le bouton de démarrage pour redémarrer le flux avec la nouvelle caméra
    }
});
