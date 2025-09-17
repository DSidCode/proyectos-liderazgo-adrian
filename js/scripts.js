document.addEventListener('DOMContentLoaded', () => {
    const storageKey = 'adrianMissionsProgress';

    // Función para actualizar la interfaz de una misión completada
    function markMissionAsCompleted(missionElement) {
        const button = missionElement.querySelector('.complete-btn');
        missionElement.classList.add('completed');
        if (button) {
            button.textContent = '¡Misión Lograda! 🎉';
            button.disabled = true;
        }
    }

    // Función para reiniciar la interfaz de una misión
    function resetMissionState(missionElement) {
        const button = missionElement.querySelector('.complete-btn');
        missionElement.classList.remove('completed');
        if (button) {
            button.textContent = 'Marcar como Misión Cumplida';
            button.disabled = false;
        }
    }

    const allMissions = document.querySelectorAll('details[data-mission-id]');

    // 1. Cargar el progreso desde localStorage cuando la página se carga
    const savedProgress = JSON.parse(localStorage.getItem(storageKey)) || {};
    allMissions.forEach(mission => {
        const missionId = mission.dataset.missionId;
        if (savedProgress[missionId]) {
            markMissionAsCompleted(mission);
        }
    });

    // 2. Añadir listeners a los botones para guardar el progreso al hacer clic
    document.querySelectorAll('.complete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const missionElement = this.closest('details');
            const missionId = missionElement.dataset.missionId;

            if (missionId) {
                // ¡Lanzar confeti para celebrar!
                confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { y: 0.6 },
                    colors: ['#ff7043', '#0d47a1', '#388e3c', '#ffb300', '#2196F3']
                });

                // Actualizar la interfaz
                markMissionAsCompleted(missionElement);

                // Guardar en localStorage
                const currentProgress = JSON.parse(localStorage.getItem(storageKey)) || {};
                currentProgress[missionId] = true;
                localStorage.setItem(storageKey, JSON.stringify(currentProgress));
            }
        });
    });

    // 3. Añadir listener al botón de reiniciar progreso
    const resetButton = document.getElementById('reset-progress-btn');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres reiniciar todo el progreso? Las misiones volverán a estar sin completar.')) {
                localStorage.removeItem(storageKey);
                allMissions.forEach(mission => {
                    resetMissionState(mission);
                });
            }
        });
    }
});