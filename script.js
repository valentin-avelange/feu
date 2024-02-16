document.getElementById('start-button').addEventListener('click', () => {
    // Obtention de la référence vers l'élément vidéo
    const videoElement = document.getElementById('live-video');

    // Configuration des contraintes pour l'accès à la caméra
    const constraints = {
        video: true
    };

    // Accès à la caméra et streaming du flux vidéo sur un smartphone android
    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            videoElement.srcObject = stream;
            // Afficher le conteneur de la vidéo une fois que le streaming commence
            document.querySelector('.video-container').style.display = 'block';
        })
        .catch(error => {
            console.error('Error accessing camera:', error);
        });
});
