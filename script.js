let stream; // Déclaration d'une variable globale pour stocker le flux vidéo

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
        video: true
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
