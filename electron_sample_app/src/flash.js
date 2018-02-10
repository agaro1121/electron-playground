let timer;

/*
* kind of like an apply method cuz file is named "flash"
* and exports is set as 'module.exports'
* */
module.exports = el => {
    if(el.classList.contains('is-flashing')){
        el.classList.remove('is-flashing')
    }

    clearTimeout(timer);
    el.classList.add('is-flashing');


    timer = setTimeout(_ => el.classList.remove('is-flashing'), 2000);
};