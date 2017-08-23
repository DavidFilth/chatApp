import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef;
  public canvas: HTMLCanvasElement;
  public context : CanvasRenderingContext2D;
  clickDrag = new Array();
  public painting: boolean;
  @Input() points: customTypes.canvasPoint[];
  constructor() { }
  ngOnInit(){
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.painting = false;
    if(!this.points){
      this.points = new Array();
    }
    else{
      this.redraw();
    }
  }
  mousedownHandler(e){
    this.painting = true;
    this.addPoint(e.offsetX, e.offsetY, false);
    this.redraw();
  }
  mousemoveHandler(e){
    if(this.painting){
      this.addPoint(e.offsetX, e.offsetY, true);
      this.redraw();
    }
  }
  stopPainting(){
    this.painting = false;
  }
  addPoint(x : number, y : number, dragging : boolean){
    this.points.push({x,y,dragging});
  }
  redraw(){
    this.clearCanvas();
    this.context.strokeStyle = "#df4b26";
    this.context.lineJoin = "round";
    this.context.lineWidth = 5;			
    for(var i=0; i < this.points.length; i++) {
      this.context.beginPath();
      if(this.points[i].dragging && i > 0){
        this.context.moveTo(this.points[i-1].x, this.points[i-1].y);
      }else{
        this.context.moveTo(this.points[i].x - 1, this.points[i].y);
      }
      this.context.lineTo(this.points[i].x, this.points[i].y);
      this.context.closePath();
      this.context.stroke();
    }
  }
  clearCanvas(){
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }
  dropDraw(){
    this.clearCanvas();
    this.points = [];
  }
}
