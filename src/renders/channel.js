export default ({ channels }) => {
    const div = document.getElementById('articleLists');
    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    channels.forEach(({ channelTitle, linkChannel, news }) => {
      li.innerHTML = `
      <div class="jumbotron text-left">
        <div class="container">
          <h2 class="jumbotron-heading">Channel:</h2>
          <p class="lead text-muted">${channelTitle}</p>
          <p> <a href="${linkChannel}" class="btn btn-secondary my-2">Go to channel</a></p>  
       </div>
      </div>
    
     <div class="album py-5 bg-light">
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
      ul.appendChild(li);
      div.appendChild(ul);
    });
  };
  