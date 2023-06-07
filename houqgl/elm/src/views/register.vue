<template>
    <page-view class="flex-column">
        <title-bar :show-back="true" @back="$router.back()">注册</title-bar>
        <div class="content-box flex-1">
            <div class="login-box">
                <div class="login-item flex-row">
                    <div class="left flex-row j-c a-c">
                        <span class="iconfont iconyonghuming"></span>
                    </div>
                    <div class="right">
                        <input type="text" placeholder="请输入用户名" class="txt" v-model="registerdata.username">
                       
                       
                    </div>
                </div>

                <div class="login-item flex-column">
                    <div class="login-item flex-row">
                        <div class="left flex-row j-c a-c">
                        <span class="iconfont iconmima"></span>
                    </div>
                    <div class="right">
                        <input type="password" placeholder="请输入密码" class="txt" v-model="registerdata.password">
                    </div> 
                    </div>

                    <div class="login-item flex-row">
                         <div class="left flex-row j-c a-c">
                        <span class="iconfont iconmima"></span>
                    </div>
                    <div class="right">
                        <input type="password" placeholder="确认密码" class="txt"  >
                    </div>
                    </div>


 <div class="login-item flex-row">
                         <div class="left flex-row j-c a-c">
                        <span class="iconfont iconmima"></span>
                    </div>
                    <div class="right">
                        <input type="text" placeholder="身份证号" class="txt"  v-model="registerdata.idcard">
                    </div>
                    </div>


                     <div class="login-item flex-row">
                         <div class="left flex-row j-c a-c">
                        <span class="iconfont iconmima"></span>
                    </div>
                    <div class="right">
                        <input type="text" placeholder="手机号码" class="txt"  v-model="registerdata.telephone">
                      
                    </div>
                    </div>

                    <div class="login-item flex-row a-c j-s-a">
                       <div>请选择头像</div>
                     
                       <input type="file" @change="uploadFile" id="q"  ref="w" >
                  
                    <div class="alert-box-item">
	                    <label class="bigImg-div"  for="q" >

			            <img class="bigImg" :src=valueUrl>
	                	</label>
	                </div>


                    </div>

                
                  

                </div>
              
                <button type="button" class="btn-login bg-primary" @click="adduser" >确定</button>
            </div>
        </div>
    </page-view>
</template>

<script>
import Api from '../utils/Api';
import axios from 'axios';
	let inputElement = null
	export default {
		data() { 
            
			return {
				valueUrl: '',
                registerdata:{
                    username:"",
                    password:"",
                    idcard:"",
                    telephone:"",
                    photo:""
                }
			}
		},

  created(){
    // if(inputElement === null){
    //             inputElement = document.createElement('input')
	// 				inputElement.setAttribute('type', 'file')
    //                 inputElement.setAttribute('ref', 'fil')
    //                 inputElement.setAttribute("id","input")
    //                 document.body.appendChild(inputElement)
    // }
 
  },


		methods: {

          
 
   

			// toGetImg() {
				
                  

			// 		if (window.addEventListener) {
			// 			inputElement.addEventListener('change', this.uploadFile, false)
			// 		} else {
			// 			inputElement.attachEvent('onchange', this.uploadFile)
			// 		}

					
				
			// 	inputElement.click()
               
			// },
			 async uploadFile(el){
				if (el && el.target && el.target.files && el.target.files.length > 0) {
					console.log(el)
					var files = el.target.files[0]
					const isLt2M = files.size / 1024 / 1024 < 2
					const size = files.size / 1024 / 1024
					console.log(size)
					// 判断上传文件的大小
					if (!isLt2M) {
						this.$msg.error('上传头像图片大小不能超过 2MB!')
					} else if (files.type.indexOf('image') === -1) { //如果不是图片格式
						// this.$dialog.toast({ mes: '请选择图片文件' });
						this.$msg.error('请选择图片文件');
					} else {
						const that = this;
						const reader = new FileReader(); // 创建读取文件对象
						reader.readAsDataURL(el.target.files[0]); // 发起异步请求，读取文件
						reader.onload = function() { // 文件读取完成后
							// 读取完成后，将结果赋值给img的src
							that.valueUrl = this.result;
                           that.photo = that.$refs["w"].value
                          
							
						
						};
                       
					}
                    var formData = new FormData()
						formData.append('file', files); // 可以传到后台的数据
                      axios.post("http://localhost:8080/adminInfo/uploadAdminPhoto",formData)
				} 

                 
                
                
			},
           



    async adduser(){

    
        let results = await Api.fridents.adduser(this.registerdata)
        console.log(results)
    }


           
		},
		
	}
   
    
</script>


<style lang="scss" scoped>
    .login-box{
        border:solid 1px #ececec;
        width:3rem;
        margin:.5rem auto;
        padding:.1rem;
        .login-item{
            padding:.1rem;
            border-bottom:solid 1px #ececec;
            #q{
               display: none;
            }
            .left{
                width:.5rem;
                .iconfont{
                    font-size:.22rem;
                }
            }
            .right{
                .txt{
                    border:none;
                    outline:none;
                    height:.4rem;
                    font-size:.16rem;
                }
                .photo{
                    color: #868484;
                    margin-left: .4rem;

                }
            }
        }
        .btn-login{
            border:none;
            height:.4rem;
            width:100%;
            color:#fff;
            font-size:.18rem;
            border-radius:.06rem;
        }

       
            #admin_photo_file{
                display: none;
            }
        
    }

    .alert-box-item {
		overflow: hidden;
	}

	.bigImg-div {
        display: block;
		width: .9rem;
		height: .9rem;
		border-radius: 100%;
		overflow: hidden;
		border: 1px solid #ddd;
	}

	.bigImg {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 100%;
	}
</style>