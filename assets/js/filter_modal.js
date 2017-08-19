var FilterModal = (function(){
    function FilterModal(context){
        this.context = context;
        this.modalOverlayEl = document.querySelector('.modal_overlay');

        this.colorEl = document.querySelector('.filter-controls [name=color]');
        this.minPriceEl = document.querySelector('.filter-controls [name=min-price]');
        this.maxPriceEl = document.querySelector('.filter-controls [name=max-price]');

        this.onClickEvent = this.onClickEvent.bind(this);
        this.onChangeEvent = this.onChangeEvent.bind(this);

        this.bindEventListeners();

        this.show();
    }

    FilterModal.prototype = {
        bindEventListeners: function(){
            document.querySelector('.modal_content').addEventListener('click', this.onClickEvent);
            document.querySelector('.filter-controls').addEventListener('click', this.onChangeEvent);
        },

        unbindEventListeners: function(){
            document.querySelector('.modal_content').removeEventListener('click', this.onClickEvent);
            document.querySelector('.filter-controls').removeEventListener('click', this.onChangeEvent);
        },

        onClickEvent: function(e){
            var src = e.target || e.srcElement;

            if(src.classList.contains('close')){
                this.close();

            } else if(src.classList.contains('submit')){
                e.preventDefault();

                this.filter();
            }
        },

        onChangeEvent: function(e){
            var src = e.target || e.srcElement;

            if(src.name === 'min-price' || src.name === 'max-price'){
               if(_.isNaN(src.value)){
                   src.value = 5;
               }

               if(src.name === 'min-price' && parseFloat(src.value) > parseFloat(this.maxPriceEl.value)){
                   src.value = this.maxPriceEl.value;
               }

                if(src.name === 'max-price' && parseFloat(src.value) < parseFloat(this.minPriceEl.value)){
                    src.value = this.minPriceEl.value;
                }
            }
        },

        filter: function(){
            var filterData = {};

            filterData.color = this.colorEl.value;

            var kindEls = document.querySelectorAll('.filter-controls [name=kind]');
            filterData.kinds = [];

            kindEls.forEach(function(el){
                if(el.checked){
                    filterData.kinds.push(el.value);
                }
            });

            filterData.minPrice = parseFloat(this.minPriceEl.value);

            filterData.maxPrice = parseFloat(this.maxPriceEl.value);

            var noveltyEl = document.querySelector('.filter-controls [name=novelty]:checked');
            filterData.isNew = (noveltyEl.value === 'yes' ? true : false);

            this.context.filter(filterData);
            this.close();
        },

        close: function(){
            this.unbindEventListeners();

            this.hide();
        },

        show: function(){
            this.modalOverlayEl.style.display = 'block';
        },

        hide: function(){
            this.modalOverlayEl.style.display = 'none';
        }
    };

    return FilterModal;
})();