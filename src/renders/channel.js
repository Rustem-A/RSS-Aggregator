export default ({ channels }) => {
    const div = document.getElementById('navbar-example2');
    const divData = document.getElementById('navbar-example2-data');
    div.innerHTML = '';
    divData.innerHTML = '';
    channels.forEach(({ channelTitle, linkChannel, news }) => {
        const liEl = document.createElement('li');
        liEl.classList.add('nav-item');
        liEl.innerHTML = `<a class="nav-link" href="#${linkChannel}">${channelTitle}</a>`;
        div.append(liEl);

        const h4El = document.createElement('h4');
        h4El.setAttribute('id', `${linkChannel}`);
        h4El.textContent = channelTitle;
        divData.append(h4El);
        
        const divDiv = document.createElement('div');
        divDiv.innerHTML = `<div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
          ${news.map(({ titleText, descriptionText, linkText }) => `
          <div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <div class="card-body">
                <h3 class="card-title">${titleText}</h3>
                <p class="card-text">${descriptionText}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button class="btn-myModal btn btn-outline-secondary btn-sm" type="button" data-toggle="modal" data-title="${titleText}" data-description="${descriptionText}", data-target="#modal">Open news</button>
                    <a href="${linkText}" class="btn btn-sm btn-outline-secondary">link news</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `).join('')}
          </div>
        </div>
      </div>`;
      divData.append(divDiv);
    });
};
