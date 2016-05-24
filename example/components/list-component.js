(function(global){
  global.ListComponent = new UIComponent({
    state:{
      currentSelected: null
    },
    events:[{
      el: 'Item',
      on: [{
          name: 'click',
          handler: 'handleClickItem'
        }]
    }],
    root: '#item-list-section'
  }, {
    handleClickItem: function(event){
      var elem = event.currentTarget;
      var state = this.getState();
      if(elem != state.currentSelected){
        if(state.currentSelected != null){
          state.currentSelected.classList.remove('selected');
        }
        elem.classList.add('selected');
        state.currentSelected = elem;
        this.setState(state);
        this.triggerAction('click', elem);
      }
    }
  })
})(window)
