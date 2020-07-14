  $(document).ready(function(){
    $("#result_div").hide();
    let tsalob =0;
    let ns = [];
    let table = [];
        let sum= function( num1, num2)
        {

    	     let result  = {
             real: parseInt(num1.real  + num2.real),
             image: parseInt(num1.image + num2.image)
           };
    	     return result;
        }
        let mult = function( num1, num2)
        {
         let result = {
             real: parseInt((num1.real*num2.real) - (num1.image*num2.image)),
             image: parseInt((num1.real*num2.image) + (num1.image*num2.real))
           } ;
           return result;
        }

        function omega( k, base)
        {
          let real =    Math.round(Math.cos(((-2*Math.PI*k)/base)));

          let image =  Math.round(Math.sin(((-2*Math.PI*k)/base)));
        //  image = Math.abs(image) < 0 ? 0: image;

          let om = {
            real:real,
            image: image
          };

          return om;
        }



    let fft = function(input,n){

      if(n==1)
        return input;
      else{
        let p_odd = [];
        let p_even =[];
        let p_out_even =[];
        let p_out_odd = [];

        for(var i=0; i< input.length;i++){
          if(i%2==0)
          {
            if(input[i].real == undefined)
              p_even.push({real: input[i], image: 0});
            else p_even.push(input[i]);
          }else{

              if(input[i].real == undefined)
                p_odd.push({real: input[i], image: 0});
              else p_odd.push(input[i]);
          }
        }
        p_out_even = fft(p_even,n/2);
        p_out_odd = fft(p_odd,n/2);


        let p_out = [];
        let k = n/2;
        for(let i=0; i < k ; i++){
          m1 = omega(i,n);
          m2 = omega(i + k,n);
          p_out[i] = sum(p_out_even[i] , mult(m1, p_out_odd[i]));
          p_out[i +k] = sum(p_out_even[i] , mult(m2 , p_out_odd[i]));

        }
        // p_out.forEach((item, i) => {
        //
        //   for(let c =0; c< columnsNum; c++){
        //     for(let r=0;r<rowsNum;r++){
        //       if($('[cell="'+r+'_'+c+'"]').html() == ""){
        //         if(item.image == 0)
        //         $('[cell="'+r+'_'+c+'"]').html(item.real);
        //         else
        //         $('[cell="'+r+'_'+c+'"]').html(item.real + "+j*" + item.image);
        //         r=rowsNum;
        //         c= columnsNum;
        //       }
        //     }
        //   }
        // });


        tsalob ++;
        return p_out;
      }
    }
    let columnsNum;
    let rowsNum;
    $(".try").on('click',function(){
      $("#values_input").val($(this).html());
      $("#solve_btn").trigger('click');
    });
    $("#solve_btn").on('click',function(){
      let input = $("#values_input").val();
      let arrayOfNums = input.split(',');
      let all_numbers = true;
      rowsNum = arrayOfNums.length;
      for(let i=0;i<arrayOfNums.length;i++){
        arrayOfNums[i] = parseInt(arrayOfNums[i]);
        if(!Number.isInteger(arrayOfNums[i])){
          all_numbers = false;
          break;
        }else{
          parseInt(arrayOfNums[i],10);
        }
      }
      if(!all_numbers)
      {
        alert("Please enter integers values seperated by comma like the example.");
      }
      else{
        tsalob =0;
        columnsNum = 1;
        for(let q = 0;q<100;q++){
          if(Math.pow(2,q) == arrayOfNums.length){
            columnsNum = q;
            break;
          }
        }
        columnsNum ++;
        // for(let r =0;r< arrayOfNums.length;r++){
        //   let row = '<tr row_num="'+r+'" > </tr>';
        //   $(".result_table").append(row);
        //
        //   for(let c=0; c<columnsNum;c++){
        //     $('[row_num="'+r+'"]').append('<td  cell="'+r+'_'+c+'"></td>');
        //   }
        // }
        // arrayOfNums.forEach((item2) => {
        //
        //     for(let c=0; c<columnsNum;c++){
        //       for(let r =0; r<rowsNum ; r++){
        //       if($('[cell="'+r+'_'+c+'"]').html() == ""){
        //
        //         $('[cell="'+r+'_'+c+'"]').html(item2);
        //         r=rowsNum;
        //         c= columnsNum;
        //       }
        //     }
        //   }
        // });
        let result = fft(arrayOfNums,arrayOfNums.length);
        let result_text = "";
        result.forEach((item, i) => {
          result_text +="";
          if(item.image == 0)
            result_text += item.real;
          else if(item.image == 1)
            result_text += item.real + " + J";
          else
            result_text += item.real + "+" + item.image + "J";
          if(i!=result.length-1)
            result_text += ", ";
        });

        $("#final_result").html(result_text);
        $("#result_div").show();


      }


    })



  })
