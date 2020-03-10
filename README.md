# dragFile
## 拖拽文件上传的封装  
https://longteng33.github.io/dragFile  
1、被拖放元素的三个事件  
1）dragstart 开始被拖拽时触发  
2）drag 在拖拽过程中触发  
3）dragend拖拽完成时触发  

2、目标元素的四个事件
1）dragenter进入目标元素时触发
2）**dragover被拖放元素在目标元素上时触发**  
3）dragleave被拖放元素从目标元素离开时触发    
4）**dragdrop被拖放元素在目标元素上，同时鼠标放开时触发**  

3、在dragover中，需要e.preventDefault()，取消默认事件，防止drop不被触发  
4、在dragdro,拖动对文件的的默认处理方式是在新窗口打开，所以需要取消其默认事件e.preventDefault();  

5、var reader=new FileReader() 创建FileReader对象  
FileReader对象负责把文件读入内存，并且读取文件中的数据，FileReader对象有一些方法和事件  
6、FileReader对象的一些方法  
1）readAsText，将文件中的数据读取为文本数据  
2）readAsBinaryString，将文件中的数据读取为二进制字符串  
3）readAsDataURL，将文件中的数据读取为DataURL字符串  
4)abort终端读取操作  
7、FileReader对象的一些事件  
1）onprogress数据读取中触发
2）onload读取完成时触发（成功才触发）  
3）onloaded读取完成时触发（无论成功还是失败）  

8、reader.onprogress = function (e) e.loaded为这一段上传中已经上传完成的部分，是数字
9、封装逻辑：  
1）传入生成拖拽组件的容器dom  
2）动态生成拖拽的目标元素、进度条  
3）在目标元素上关联dragover事件 drop事件 ，取消默认事件  
4）在reader对象上关联onprogress事件，onload事件  
5）drop中开始读取，一次读取没完继续递归，直到读取完成