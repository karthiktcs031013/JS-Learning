const gitHub = new GitHub();
const ui = new UI();
document.getElementById('searchUser').addEventListener('keyup',(e) => {
    let searchValue = e.target.value;
    if(searchValue != '') {
        gitHub.getUser(searchValue)
            .then(data => {
                if(data.profile.message === 'Not Found') {
                    ui.showAlert('User Not Found','alert alert-danger');
                } else {
                    ui.showProfile(data.profile);
                    ui.showRepos(data.repos);
                }
            });
    } else {
        ui.clearProfile();
    }
});