// ↓ 開始手動定義存入物品的清單物件，其中這個清單物件有三個屬性 name, time, items，其中 items 是一個以商品物件們（他們各自帶有商品名 name 和價錢 price 屬性）構成的陣列
var total_list={};

total_list.name="My buylist 購物清單";
total_list.time="2018/11/23";
total_list.items=[
  {name: "吹風機",price: 300},
  {name: "麥克風",price: 9000},
  {name: "筆記型電腦",price: 55555}, 
  {name: "iPhone 9",price: 32000}, 
  {name: "神奇海螺",price: 5000},];

var item_url="https://awiclass.monoame.com/api/command.php?type=get&name=itemdata"

// 使用 ajax 從外部載入清單資料，並且轉換成物件形式存入 total_list 中的 items 屬性。
$.ajax({
  url: item_url,
  success: function(res){
    total_list.items=JSON.parse(res)
    update_list()
  }
})

/////// 程式區 ////////

// 動態編輯 html 程式區，先建立模板
var item_html="<li class='buy_item'>{{number}}. {{item_name}}<div class='price'>{{price}} $</div><div class='del_button' id={{del_id}}>X</div></li>"
var total_html="<div class='total'> 總價 :<div class='price'>{{total_price}} $</div></div>"

// 更新清單的動作程式模組
function update_list()
{
  $(".list_area").html("");
  var total_price=0
    for (i=0;i<total_list.items.length;i=i+1)
      {
        var item＿object=total_list.items[i]
        var current_item_html=item_html.replace("{{number}}",i+1)
                                       .replace("{{item_name}}",item＿object.name)
                                       .replace("{{price}}",item＿object.price)
                                       .replace("{{del_id}}",i)
        $(".list_area").append(current_item_html);
        total_price=total_price+parseInt(item＿object.price)
      };  
   $(".list_area").append(total_html.replace("{{total_price}}",total_price));
   $(".price").addClass("total_price_style");
};

// 讀取使用輸入資料以新增至陣列內的程式指令
$(".add_button").click(
  function()
  {
    total_list.items.push(
      {
       name: $("#input_name").val(), 
       price: $("#input_price").val()
      }
    );
    $("#input_name").val("");
    $("#input_price").val("");
    update_list();
  }
);

// 動態移除清單陣列程式模組
function remove_item(id)
{
  total_list.items.splice(id,1);
}

// 點擊後刪除程式指令，改用.on存取事件指令跟selector
$(document).on('click','.del_button',
  function()
  {
    remove_item(($(this).attr("id")))
    update_list()
  }
);