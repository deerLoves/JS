<a-form-item
  :labelCol="labelCol"
  :wrapperCol="wrapperCol"
  label='手机：'
>
<a-input
  type="number"
  v-decorator="[
    'phone',
    {
      rules: [
        { required: false, message: '请输入手机号码!' },]
    },
  ]"
  @blur="validatePhoneBlur"
  placeholder='请输入手机号码' />
</a-form-item>

// 校验事件
validatePhoneBlur(e) {
  const validatePhoneReg = /^1\d{10}$/
  if (e.target.value && !validatePhoneReg.test(e.target.value)) {
    const arr = [{
      message: '您输入的手机格式不正确!',
      field: 'phone',
    }]
    this.form.setFields({ phone: { value: e.target.value, errors: arr } })
  }
}