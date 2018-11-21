class GitHub {
    constructor() {
        this.client_id='8732ab4d92950c7da567';
        this.client_secret='1116ca7575840cee768adce8b130dd3cad179c8a';
        this.repos_count=5;
        this.repos_sort='created:asc';
    }

    async getUser(user) {
        const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const reposResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);
        const profileData = await profileResponse.json();
        const reposData = await reposResponse.json();
        return {
            profile:profileData,
            repos:reposData
        }
    }
}