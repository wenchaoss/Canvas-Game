(function(){
	var Paopao = window.Paopao = function(person){
		//自己的泡泡地图，挪到map类
		// this.pmap= [
		// 	[5,5,5,5,5,5,5,5,5,5,5],//0
		// 	[5,0,0,5,1,0,0,5,2,3,5],//1
		// 	[5,0,3,4,0,0,1,4,5,1,5],//2
		// 	[5,5,2,5,1,1,0,0,3,2,5],//3
		// 	[5,4,5,4,0,0,1,4,5,4,5],//4
		// 	[5,2,3,0,1,0,0,5,3,5,5],//5
		// 	[5,1,5,4,0,1,1,4,2,0,5],//6
		// 	[5,3,2,5,1,0,0,5,0,0,5],//7
		// 	[5,5,5,5,5,5,5,5,5,5,5] //8
		//   // 0 1 2 3 4 5 6 7 8 9 10
		// ];
		//宽44 高41
		//自己的位置
		this.person = person;
		this.paocow = this.person.cow;
		this.paorow = this.person.row;
		//炸弹范围
		this.fanwei = 1;
		//自己的计数器
		this.fram = 0;
		this.idx = 0;
		//爆炸计时器
		this.bfram = 0;
		this.bidx = 0;
		// console.log(g.paopaoArr);
		g.paopaoArr.push(this);
		// console.log(g.map.shangceng)
		
	}

	Paopao.prototype.boom = function(){
		this.bfram++;
		if((this.bfram%5 == 0)&&(this.bfram <=20)){
			if(this.bidx >1){
				this.bidx = 0;
			}else{
				this.bidx++;
			}
			// console.log(this.idx)
		}
		g.ctx.drawImage(g.Robj["baozha"],40*this.bidx,0,40,40,this.paocow*40,this.paorow*40,40,40);
		//13是炸的时候，2是占位符
		g.map.boommap[this.paorow][this.paocow+1] = 3;
		//上
		// console.log(this.paorow, this.paocow+1)
		// console.log(this.pmap[this.paorow-1][this.paocow+1])
		
		if(g.map.pmap[this.paorow-1][this.paocow+1] != 5){
			g.ctx.drawImage(g.Robj["baozha"],40*this.bidx,40,40,40,this.paocow*40,this.paorow*40-40,40,40);
			g.map.boommap[this.paorow-1][this.paocow+1] = 1;
		};
		//右
		if(g.map.pmap[this.paorow][this.paocow+2]!=5){
			g.ctx.drawImage(g.Robj["baozha"],40*this.bidx,80,40,40,this.paocow*40+40,this.paorow*40,40,40);
			g.map.boommap[this.paorow][this.paocow+2] = 1;
		};
		//下
		if(g.map.pmap[this.paorow+1][this.paocow+1]!=5){
			g.ctx.drawImage(g.Robj["baozha"],40*this.bidx,120,40,40,this.paocow*40,this.paorow*40+40,40,40);
			g.map.boommap[this.paorow+1][this.paocow+1] = 1;
		};
		//左
		if(g.map.pmap[this.paorow][this.paocow]!=5){
			g.ctx.drawImage(g.Robj["baozha"],40*this.bidx,160,40,40,this.paocow*40-40,this.paorow*40,40,40);
			g.map.boommap[this.paorow][this.paocow] = 1;
		}
		this.check();
		// console.log("老的 "+g.map.boommap);
		// console.log(g.p1.row,g.p1.cow)
		// this.boomcheck();

	}
	//爆炸时临时地图上1之后重新设置为0
	Paopao.prototype.boomback = function(){
		g.map.boommap[this.paorow-1][this.paocow+1] = 0;
		g.map.boommap[this.paorow][this.paocow+2] = 0;
		g.map.boommap[this.paorow+1][this.paocow+1] = 0;
		g.map.boommap[this.paorow][this.paocow] = 0;
		g.map.boommap[this.paorow][this.paocow+1] = 0;
		// console.log("新的 "+g.map.boommap);
	}
	Paopao.prototype.check = function(){
		//上
		if(g.map.pmap[this.paorow-1][this.paocow+1] != 5){
			g.map.pmap[this.paorow-1][this.paocow+1] = g.map.shangceng[this.paorow-1][this.paocow+1] = 0;
		}
		//右
		if(g.map.pmap[this.paorow][this.paocow+2]!=5){
			g.map.pmap[this.paorow][this.paocow+2] = g.map.shangceng[this.paorow][this.paocow+2] = 0;
		}
		//下
		if(g.map.pmap[this.paorow+1][this.paocow+1]!=5){
			g.map.pmap[this.paorow+1][this.paocow+1] = g.map.shangceng[this.paorow+1][this.paocow+1] = 0;
		}
		//左
		if(g.map.pmap[this.paorow][this.paocow]!=5){
			g.map.pmap[this.paorow][this.paocow] = g.map.shangceng[this.paorow][this.paocow] = 0;
		}

	}

	Paopao.prototype.render = function(){
		this.fram++;
		g.ctx.drawImage(g.Robj["paopao"],44*this.idx,0,44,41,this.paocow*40-2,this.paorow*40-1,44,41);
		//泡泡占空
		g.map.boommap[this.paorow][this.paocow+1] = 2;
		
		if((this.fram%3 == 0)&&(this.fram <=130)){ //81
			if(this.idx >1){
				this.idx = 0;
			}else{
				this.idx++;
			}
			// console.log(this.idx)
		}else if(this.fram>130&&this.fram<151){   //101   第一个和上面的第一个是维持泡泡的时间，差值是爆炸持续时间
			this.boom();
			// g.p1.onpaopao--;
			// g.paopaoArr = _.without(g.paopaoArr,this);
		}else if(this.fram>131){
			this.boomback();
			this.person.onpaopao--;
			g.paopaoArr = _.without(g.paopaoArr,this);
		}

	}
})();