function otherEffects(seriously, src, target, effectName) {
    const effect = seriously.effect(effectName);
    effect.source = src;
    target.source = effect;
    seriously.go()
}

const effects = {
    vanilla: (seriously, src, target) => {
        target.source = src;
        seriously.go();
    },
    ascii: (seriously, src, target) => {
        const ascii = seriously.effect('ascii');
        ascii.source = src;
        target.source = ascii;
        seriously.go()
    },
    daltonize: (seriously, src, target) => otherEffects(seriously, src, target, 'daltonize'),
    filmgrain: (seriously, src, target) => otherEffects(seriously, src, target, 'filmgrain'),
    hex: (seriously, src, target) => otherEffects(seriously, src, target, 'hex'),
    kaleidoscope: (seriously, src, target) => otherEffects(seriously, src, target, 'kaleidoscope'),
    mirror: (seriously, src, target) => otherEffects(seriously, src, target, 'mirror'),
    nightvision: (seriously, src, target) => otherEffects(seriously, src, target, 'nightvision'),
    pixelate: (seriously, src, target) => otherEffects(seriously, src, target, 'pixelate'),
    ripple: (seriously, src, target) => otherEffects(seriously, src, target, 'ripple'),
    scanlines: (seriously, src, target) => otherEffects(seriously, src, target, 'scanlines'),
    sketch: (seriously, src, target) => otherEffects(seriously, src, target, 'sketch'),
    vibrance: (seriously, src, target) => otherEffects(seriously, src, target, 'vibrance'),
    vignette: (seriously, src, target) => otherEffects(seriously, src, target, 'vignette')

};

const effectNames = Object.keys(effects);
let currentIndex = 0;

function setNextIndex(){
    const nextIndex = currentIndex + 1 < effectNames.length ? currentIndex + 1 : 0;
    currentIndex = nextIndex;
    return currentIndex;
}

function setIndexEffectIndex(effectName) {
    currentIndex = effectNames.indexOf(effectName);
    return currentIndex;
}

exports.choose = (seriously, src, target, effectName = 'vanilla') => {
    effects[effectName](seriously, src, target);
    setIndexEffectIndex(effectName);
};

exports.cycle = (seriously, src, target) => {
    setNextIndex();
    effects[effectNames[currentIndex]](seriously, src, target);
};

