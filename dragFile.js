function DragFile(dragFileObj) {
    this.ele = dragFileObj.ele;
    this.step = dragFileObj.step;
    this.cb = dragFileObj.cb;

    this.reader = new FileReader();// 创建FileReader对象
    this.fileCon = null;
    this.progressCon = null;
    this.val = null;
    this.text = null;

    this.file = null;//存储拖拽进来的文件
    // 用来存储已经上传了多少
    this.loaded = 0;
    // file长度
    this.total = 0;

    this.init();
    // bindEvent在init之后
    this.bindEvent();
}

DragFile.prototype = {
    init: function () {
        this.fileCon = document.createElement("div");
        this.fileCon.classList.add("file-con");
        this.fileCon.innerText = "拖拽文件到此区域...";
        this.ele.appendChild(this.fileCon);

        this.progressCon = document.createElement("div");
        this.progressCon.classList.add("progress-con");
        this.progressCon.innerHTML =
            `<div class="progress">
        <div class="val"></div>
    </div>
    <span class="text">0%</span>`;
        this.ele.appendChild(this.progressCon);

        this.val = document.getElementsByClassName("val")[0];
        this.text = document.getElementsByClassName("text")[0];

    },

    bindEvent: function () {
        var _this = this;
        this.fileCon.ondragover = function (e) {
            // 取消默认事件
            e.preventDefault();
        };

        this.fileCon.ondrop = function (e) {
            // 默认会把拖到里面的文件打开，取消默认事件
            e.preventDefault();
            // 获取拖拽进来的文件
            _this.file = e.dataTransfer.files[0];
            _this.total = _this.file.size;
            _this.readBlob(_this.reader, 0, _this.step);

        }

        // reader对象在读取中的事件
        this.reader.onprogress = function (e) {
            // e.loaded为这一段上传中已经上传完成的部分
            _this.loaded += e.loaded;
            var per = _this.loaded / _this.total;
            if (per >= 1) {
                per = 1;
            }
            _this.val.style.width = per * 250 + "px";
            _this.text.innerHTML = Math.round(per * 100) + "%";
            
        }

        // reader对象的一段读取完成时的事件
        this.reader.onload = function () {
            if (_this.loaded < _this.total) {
                _this.readBlob(_this.reader, _this.loaded, _this.step);
            }else{
                _this.cb();
            }
            
        }

    },

    // readBlob函数用来读取文件
    readBlob: function (reader, start, step) {
        if (this.file.slice) {
            // 如果文件能够被裁切，就将文件裁切为（a至a+b）这一小段，并存储在blob中
            var blob = this.file.slice(start, start + step);
        } else {
            // 如果文件不能被裁切，那么就将文件作为一整段
            var blob = this.file;
        }
        // 在FileReader对象中将裁切好的这一段文件blob以文本数据形式读取进来    
        reader.readAsText(blob);
    },


}























