export default ({ exampelButtons }) => {
    const btnLink1 = document.getElementById('Examle#1');
    const btnLink2 = document.getElementById('Examle#2');
    
    switch(exampelButtons) {
        case 'disabled':
            btnLink1.setAttribute('disabled', '');
            btnLink2.setAttribute('disabled', '');
            break;
        
        case 'active':
            btnLink1.removeAttribute('disabled');
            btnLink2.removeAttribute('disabled');
            break;
      }
  };