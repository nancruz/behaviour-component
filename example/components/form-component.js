(function(global){
  global.FormComponent = UIComponent({
    state:{
      name: ''
    },
    events:[{
      el: 'NameInput',
      on: [{
          name: 'keyup',
          handler: 'handleChangeName'
        }]
    }],
    root: '#form-section'
  }, {
    handleChangeName: function(event){
      var value = event.currentTarget.value;
      if(value.length > 10){
        this.getElement("NameError").classList.remove('hidden');
      }
    }
  });
})(window)
