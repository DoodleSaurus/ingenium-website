class TypingAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.words = JSON.parse(element.getAttribute('data-words') || '[]');
        this.currentWordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        // Default options
        this.options = {
            typingSpeed: 200,
            deletingSpeed: 100,
            pauseTime: 2000,
            loop: true,
            cursor: true,
            ...options
        };
        
        this.init();
    }
    dele
    init() {
        if (this.words.length === 0) {
            console.warn('No words provided for typing animation');
            return;
        }
    
        if (this.options.cursor) {
            this.createCursor();
        }
        
        this.type();
    }
    
    createCursor() {
        const existingCursor = this.element.parentNode.querySelector('.typing-cursor');
        if (existingCursor) {
            existingCursor.remove();
        }
        
        this.cursor = document.createElement('span');
        this.cursor.className = 'typing-cursor';
        // this.cursor.textContent = '|';
        
        this.element.parentNode.insertBefore(this.cursor, this.element.nextSibling);
    }
    
    type() {
        if (this.isPaused) return;
        
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
            this.speed = this.options.deletingSpeed;
        } else {
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
            this.speed = this.options.typingSpeed;
        }
        
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            this.isDeleting = true;
            this.speed = this.options.pauseTime;
            this.element.classList.add('complete');
        } 
        else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.element.classList.remove('complete');
            
            if (this.options.loop) {
                this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            } else {
                this.currentWordIndex++;
                if (this.currentWordIndex >= this.words.length) {
                    this.stop();
                    return;
                }
            }
            
            this.speed = 500; 
        }
        
        setTimeout(() => this.type(), this.speed);
    }
    
    pause() {
        this.isPaused = true;
        this.element.classList.add('paused');
        if (this.cursor) {
            this.cursor.style.animationPlayState = 'paused';
        }
    }
    
    resume() {
        this.isPaused = false;
        this.element.classList.remove('paused');
        if (this.cursor) {
            this.cursor.style.animationPlayState = 'running';
        }
        this.type();
    }
    
    stop() {
        this.isPaused = true;
        this.element.classList.add('paused');
        if (this.cursor) {
            this.cursor.style.display = 'none';
        }
    }
    
    restart() {
        this.currentWordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.element.classList.remove('paused', 'complete');
        if (this.cursor) {
            this.cursor.style.display = 'inline-block';
            this.cursor.style.animationPlayState = 'running';
        }
        this.type();
    }
    
    updateWords(newWords) {
        this.words = newWords;
        this.restart();
    }
    
    destroy() {
        this.stop();
        if (this.cursor) {
            this.cursor.remove();
        }
    }
}

function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach((element, index) => {
        const options = {
            pauseTime: 2000 + (index * 500), 
            cursor: true,
            loop: true
        };
        
        const typing = new TypingAnimation(element, options);
        
        element.typingAnimation = typing;
        
        element.addEventListener('mouseenter', () => {
            typing.pause();
        });
        
        element.addEventListener('mouseleave', () => {
            typing.resume();
        });
    });
    
    console.log(`Initialized ${typingElements.length} typing animation(s)`);
}

function createAdvancedTypingAnimation(containerId, config) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found`);
        return null;
    }
    
    const defaultConfig = {
        typingSpeed: 200,
        deletingSpeed: 100,
        pauseTime: 2000,
        prefix: '',
        suffix: '',
        cursor: true
    };
    
    const finalConfig = { ...defaultConfig, ...config };
    
    const typingElement = document.createElement('span');
    typingElement.className = 'typing-text';
    typingElement.setAttribute('data-words', JSON.stringify(finalConfig.words));
    
    const wrapper = document.createElement('span');
    wrapper.className = 'typing-container';
    
    if (finalConfig.prefix) {
        const prefixElement = document.createElement('span');
        prefixElement.textContent = finalConfig.prefix + ' ';
        wrapper.appendChild(prefixElement);
    }
    
    wrapper.appendChild(typingElement);
    
    if (finalConfig.suffix) {
        const suffixElement = document.createElement('span');
        suffixElement.textContent = ' ' + finalConfig.suffix;
        wrapper.appendChild(suffixElement);
    }
    
    container.innerHTML = '';
    container.appendChild(wrapper);
    
    const typing = new TypingAnimation(typingElement, {
        typingSpeed: finalConfig.typingSpeed,
        deletingSpeed: finalConfig.deletingSpeed,
        pauseTime: finalConfig.pauseTime,
        cursor: finalConfig.cursor
    });
    
    return typing;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TypingAnimation, initTypingAnimation, createAdvancedTypingAnimation };
}