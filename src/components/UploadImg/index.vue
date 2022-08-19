<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="dialogVisible">
      <img :src="imgUrl" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKIDaknfLrALLAl9KJ4cw4UjkY8aopdCWdYH',
  SecretKey: 'fHgdLn11mHXYLtCG7lAPRGrCKGyRdZJq'
})
// console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [
        // {
        //   name: 'test',
        //   url: 'https://img0.baidu.com/it/u=2466097816,3421780137&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500'
        // }
      ],
      dialogVisible: false,
      imgUrl: '',
      loading: false
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'grj-31-1313341610' /*桶名字必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          }
        },
        (err, data) => {
          if (err || data.statusCode !== 200) {
            // console.log(err)
            return this.$message('上传失败，请重新上传')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location
          })
          this.loading = false
        }
      )
    },
    // 上传成功后的回调
    onChange(file, filelist) {
      this.fileList = filelist
      console.log(filelist)
    },
    // 移除成功
    onRemove(file, filelist) {
      this.fileList = filelist
      console.log(filelist)
    },
    // 预览图片
    onPreview(file) {
      console.log(file)
      this.dialogVisible = true
      this.imgUrl = file.url
    },
    // 上传前的限制条件
    beforeUpload(file) {
      // 限制上传的图片类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        return this.$message.error('请上传' + types.join('、') + '图片')
      }
      //   限制上传的图片大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片不得超过2mb')
        return false
      }
    }
  }
}
</script>

<style scoped lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
// id:AKIDaknfLrALLAl9KJ4cw4UjkY8aopdCWdYH
// key:fHgdLn11mHXYLtCG7lAPRGrCKGyRdZJq
</style>
