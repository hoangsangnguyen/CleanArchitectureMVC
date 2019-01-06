class AuthCtrl {
    constructor(User, $state) {
        'ngInject';

        this._User = User;
        this._$state = $state;

        this.title = $state.current.title;
        this.authType = $state.current.name.replace('app.', '');

    }

    submitForm() {
        this.isSubmitting = true;

<<<<<<< HEAD
        this._User.attemptAuth(this.authType, this.formData).then(
            (res) => {
                this._$state.go('app.home');
            },
            (err) => {
                this.isSubmitting = false;
                this.errors = err.data.errors;
            }
        )
=======
        //this._User.attemptAuth(this.authType, this.formData).then(
        //    (res) => {
        //        this._$state.go('app.home');
        //    },
        //    (err) => {
        //        this.isSubmitting = false;
        //        this.errors = err.data.errors;
        //    }
        //)
>>>>>>> 0a9a0109244b9850d7aa04f08ba85e6791359475
    }
}

export default AuthCtrl;
