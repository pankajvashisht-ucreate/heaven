<template>
<div class="login_view">
    <div class="container">
        <div class="d-flex justify-content-center h-100">
        <div class="card">
         <div class="card-header">
            <h3>Sign In</h3>
        </div>   
        <div class="card-body" >
        <form @submit.prevent="handleSubmit">
            <div class="input-group form-group">
            <div class="input-group-prepend">
                <span class="input-group-text">
                    <i class="fas fa-user"></i>
                </span>
            </div>
            <input type="email" v-model="email" placeholder="Email" name="Email" value="email" class="form-control" :class="{ 'is-invalid': submitted && !email }" /> 
            <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
            </div>
            <div class="input-group form-group">
            <div class="input-group-prepend">
				<span class="input-group-text"><i class="fas fa-key"></i></span>
			</div>
            
            <input type="password" v-model="password" placeholder="Password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
            <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary  float-right login_btn" :disabled="loading"> Login</button>
                <Spinner  v-show="loading" />
            </div>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
        </form>
        </div>
        </div>
        </div>
    </div>
</div>  
</template>

<script>
import { Adminlogin } from '../Apis/Admin'
import Spinner from '../components/Spinner'
export default {
    name:"Login",
    components:{
        Spinner
    },
    beforeCreate: function() {
        document.body.className = 'login';
    },
    data(){
        return {
            email: '',
            password: '',
            submitted: false,
            loading: false,
            returnUrl: '',
            error: '',
        }
    },
    methods:{
        handleSubmit:function (e){
            e.preventDefault();
            this.submitted = true;
            const { email, password } = this;
            if (!(email && password)) {
                return;
            }
            this.loading = true;
            Adminlogin({email, password}).then(responce => {
                const { data } = responce;
                localStorage.setItem('users', JSON.stringify(data.data));
                this.returnUrl = this.$route.query.returnUrl || '/dashboard';
                this.$router.push(this.returnUrl);
                this.loading = false;
            }).catch(err => {
                 const { responce } = err;  
                 alert(responce)
                 this.loading = false;
            });
            
        }
    }

}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Numans');
body.login {
    background-image: url('http://getwallpapers.com/wallpaper/full/a/5/d/544750.jpg') !important;
    background-size: cover;
    background-repeat: no-repeat;
}
.login_view{
height: 100%;
font-family: 'Numans', sans-serif;
}

.container{
height: 100%;
align-content: center;
}

.card{
height: 370px;
margin-top: auto;
margin-bottom: auto;
width: 400px;
background-color: rgba(0,0,0,0.5) !important;
}

.social_icon span{
font-size: 60px;
margin-left: 10px;
color: #FFC312;
}

.social_icon span:hover{
color: white;
cursor: pointer;
}

.card-header h3{
color: white;
}

.social_icon{
position: absolute;
right: 20px;
top: -45px;
}

.input-group-prepend span{
width: 50px;
background-color: #FFC312;
color: black;
border:0 !important;
}

input:focus{
outline: 0 0 0 0  !important;
box-shadow: 0 0 0 0 !important;

}

.remember{
color: white;
}

.remember input
{
width: 20px;
height: 20px;
margin-left: 15px;
margin-right: 5px;
}

.login_btn{
color: black;
background-color: #FFC312;
width: 100px;
}

.login_btn:hover{
color: black;
background-color: white;
}

.links{
color: white;
}

.links a{
margin-left: 4px;
}
</style>