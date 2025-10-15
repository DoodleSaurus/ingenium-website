class ParticleSystem {
    constructor() {
        this.particlesJS = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;

        if (typeof particlesJS !== 'undefined') {
            this.initParticles();
        } else {
            this.loadParticlesJS();
        }
    }

    loadParticlesJS() {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.onload = () => {
            this.initParticles();
        };
        document.head.appendChild(script);
    }

    initParticles() {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#F1B98C'
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 100,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 2,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#F39F7E',
                    opacity: 0.8,
                    width: 1,
                    shadow: {
                        enable: true,
                        color: '#D95C59',
                        blur: 5
                    }
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });

        this.isInitialized = true;
        
        this.handleResize();
    }

    handleResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.pJSDom && window.pJSDom[0]) {
                    window.pJSDom[0].pJS.fn.particlesRefresh();
                }
            }, 250);
        });
    }

    destroy() {
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.fn.destroy();
            this.isInitialized = false;
        }
    }

    updateParticleCount(count) {
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.particles.number.value = count;
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
}

const particleSystem = new ParticleSystem();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = particleSystem;
}