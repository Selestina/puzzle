//canvas = document.createElement('canvas');
//canvas.id = 'img';
//document.getElementById('game').appendChild(canvas);
var img = document.getElementById('img');
//ctx = img.getContext('2d');
//pic = new Image();              
//pic.src = file; //pic.src=file;
//перименовать start(file), newgame(file) 
//pic.onload = function() {
function start(file) {
	file = file[0];
	reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function(e) {
    	img.src=e.target.result;
	//высота и ширина canvas как у картинки
	//img.width = pic.width;
	//img.height = pic.height; 
		zIndex=1;
	//ctx.drawImage(pic, 0, 0); 
		rows = document.getElementById('rows').value;
		cols = document.getElementById('cols').value;
		rowsHeight = Math.round(img.height/rows);
		colsWidth = Math.round(img.width/cols);
		for(i=1; i<=rows; i++){
			for(j=1; j<=cols; j++){
				piece = document.createElement('canvas');
				piece.id = 'piece'+i+j;
				piece.className='piece';
				//случайное положение кусочка в пределах картинки
				piece.style.top=Math.round(img.height*Math.random())+'px';
				piece.style.left=Math.round(img.width*Math.random())+'px';
				piece.width=colsWidth;
				piece.height=rowsHeight;
				piecectx=piece.getContext('2d');
				piecectx.drawImage(img, (j-1)*colsWidth, (i-1)*rowsHeight, colsWidth, rowsHeight, 0, 0, colsWidth, rowsHeight);
				document.getElementById('game').appendChild(piece);
				$('#piece'+i+j).data({'x':j-1,'y':i-1}); //в куски записываем информацию об их "координатах"
			}
        }
        //уменьшение изображения и кусочков
        if (img.width>800) {
            img.width=800;
            rowsHeight = Math.round(img.height/rows);
            colsWidth = Math.round(img.width/cols);
            $('.piece').css('width',colsWidth);
        }        
		//Перетаскивание            
		$('.piece').draggable({ snap:true, snapMode:"outer", snapTolerance:2});
		//подъём кусочка при нажатии
		$('.piece').mousedown(function(){
			$(this).css('z-index',zIndex); 
			zIndex++;
		});
		$('.piece').mouseup(function(){
			//alert($(this).position().left+' '+$(this).position().top);
			if ((Math.abs($(this).data('x')*colsWidth-$(this).position().left)<=3) && (Math.abs($(this).data('y')*rowsHeight-$(this).position().top)<=3)){
	            $(this).draggable('disable');
	            $(this).css({'top':$(this).data('y')*rowsHeight, 'left':$(this).data('x')*colsWidth});
			    //для удаления и присовения класса
			    $(this).removeClass('piece');
			    $(this).addClass('solved');
			}
			//для условия решения
			if ($('.solved').length==rows*cols) alert('ты молодец:)')
		});
	};
}