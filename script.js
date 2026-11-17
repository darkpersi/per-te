// Genera le stelline casuali sullo sfondo
function creaStelline() {
    const contenitoreStelle = document.getElementById('stellato');
    const numeroStelle = 45;
    
    for (let i = 0; i < numeroStelle; i++) {
        const stella = document.createElement('div');
        stella.className = 'stella';
        
        const dimensione = Math.random() * 2.5 + 1;
        stella.style.width = `${dimensione}px`;
        stella.style.height = `${dimensione}px`;
        stella.style.top = `${Math.random() * 100}%`;
        stella.style.left = `${Math.random() * 100}%`;
        stella.style.animationDelay = `${Math.random() * 3}s`;
        stella.style.animationDuration = `${Math.random() * 3 + 2}s`;
        
        contenitoreStelle.appendChild(stella);
    }
}

creaStelline();

// Mappa emoji Apple
const mappaEmojiApple = {
    '❤️': 'https://emojicdn.elk.sh/❤️?style=apple',
    '🎈': 'https://emojicdn.elk.sh/🎈?style=apple',
    '✨': 'https://emojicdn.elk.sh/✨?style=apple',
    '🔄': 'https://emojicdn.elk.sh/🔄?style=apple'
};

function applicaEmojiApple() {
    document.body.innerHTML = document.body.innerHTML.replace(/❤️|🎈|✨|🔄/g, (match) => {
        return `<img src="${mappaEmojiApple[match]}" alt="${match}" class="emoji-apple">`;
    });
}

applicaEmojiApple();

let conteggio = localStorage.getItem('conteggioAmore');

if (conteggio === null) {
    conteggio = 0;
} else {
    conteggio = parseInt(conteggio);
}

aggiornaTesto();

// Se ricarica la pagina e ha già superato o raggiunto 500, mostra subito il messaggio segreto
if (conteggio >= 500) {
    document.getElementById('messaggioSegreto').classList.remove('nascosto');
}

function ricambia() {
    conteggio++;
    localStorage.setItem('conteggioAmore', conteggio);
    aggiornaTesto();

    // Se arriva esattamente a 500, attiva i coriandoli e mostra il messaggio segreto
    if (conteggio === 500) {
        lanciaCoriandoli();
        document.getElementById('messaggioSegreto').classList.remove('nascosto');
    }

    // Animazione stickman
    const stickman = document.getElementById('stickman');
    stickman.style.transform = "scale(1.12) translateY(-6px)";
    setTimeout(() => {
        stickman.style.transform = "scale(1) translateY(0)";
    }, 220);

    generaCuoricini();
}

// Funzione per azzerare tutto e nascondere di nuovo il messaggio segreto
function azzeraCuori() {
    conteggio = 0;
    localStorage.setItem('conteggioAmore', conteggio);
    aggiornaTesto();
    document.getElementById('messaggioSegreto').classList.add('nascosto');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Funzione coriandoli di festa
function lanciaCoriandoli() {
    confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff758f', '#ffffff', '#c9184a']
    });
}

function generaCuoricini() {
    const btn = document.querySelector('.btn-principale');
    const rettangoloBtn = btn.getBoundingClientRect();
    
    for (let i = 0; i < 4; i++) {
        const cuore = document.createElement('img');
        cuore.src = mappaEmojiApple['❤️'];
        cuore.className = 'emoji-apple cuoricino-volante';
        
        const offsetX = (Math.random() - 0.5) * 120;
        cuore.style.left = `${rettangoloBtn.left + rettangoloBtn.width / 2 + offsetX}px`;
        cuore.style.top = `${rettangoloBtn.top}px`;
        
        const dirX = (Math.random() - 0.5) * 100;
        const rotazione = (Math.random() - 0.5) * 60;
        cuore.style.setProperty('--x-dir', `${dirX}px`);
        cuore.style.setProperty('--rot', `${rotazione}deg`);
        
        document.body.appendChild(cuore);
        
        setTimeout(() => {
            cuore.remove();
        }, 1200);
    }
}

function aggiornaTesto() {
    const testo = document.getElementById('testoContatore');
    testo.innerText = `Hai ricambiato l'amore ${conteggio} ${conteggio === 1 ? 'volta' : 'volte'}`;
}