"use strict"; // Email.js version 5
var tld_ = new Array();
tld_[0] = "com";
tld_[1] = "org";
tld_[2] = "net";
tld_[3] = "ws";
tld_[4] = "info";
tld_[10] = "co.uk";
tld_[11] = "org.uk";
tld_[12] = "gov.uk";
tld_[13] = "ac.uk";
var topDom_ = 13;
var m_ = "mailto:";
var a_ = "@";
var d_ = ".";

function mail(name, dom, tl, params)
{
  var s = e(name, dom, tl);
  document.write('<a href="' + m_ + s + params + '">' + s + '</a>');
}
function mail2(name, dom, tl, params, display)
{
  document.write('<a href="' + m_ + e(name, dom, tl) + params + '">' + display + '</a>');
}
function e(name, dom, tl)
{
  var s = name + a_;
  if (tl != -2)
  {
    s += dom;
    if (tl >= 0)
    s += d_ + tld_[tl];
  } else

  s += swapper(dom);
  return s;
}
function swapper(d)
{
  var s = "";
  for (var i = 0; i < d.length; i += 2) {
    if (i + 1 == d.length)
    s += d.charAt(i);else

    s += d.charAt(i + 1) + d.charAt(i);}
  return s.replace(/\?/g, '.');
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVtYWlsLmpzIl0sIm5hbWVzIjpbInRsZF8iLCJBcnJheSIsInRvcERvbV8iLCJtXyIsImFfIiwiZF8iLCJtYWlsIiwibmFtZSIsImRvbSIsInRsIiwicGFyYW1zIiwicyIsImUiLCJkb2N1bWVudCIsIndyaXRlIiwibWFpbDIiLCJkaXNwbGF5Iiwic3dhcHBlciIsImQiLCJpIiwibGVuZ3RoIiwiY2hhckF0IiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6ImNBQUE7QUFDQSxJQUFJQSxJQUFJLEdBQUcsSUFBSUMsS0FBSixFQUFYO0FBQ0FELElBQUksQ0FBQyxDQUFELENBQUosR0FBVSxLQUFWO0FBQ0FBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVSxLQUFWO0FBQ0FBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVSxLQUFWO0FBQ0FBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVSxJQUFWO0FBQ0FBLElBQUksQ0FBQyxDQUFELENBQUosR0FBVSxNQUFWO0FBQ0FBLElBQUksQ0FBQyxFQUFELENBQUosR0FBVyxPQUFYO0FBQ0FBLElBQUksQ0FBQyxFQUFELENBQUosR0FBVyxRQUFYO0FBQ0FBLElBQUksQ0FBQyxFQUFELENBQUosR0FBVyxRQUFYO0FBQ0FBLElBQUksQ0FBQyxFQUFELENBQUosR0FBVyxPQUFYO0FBQ0EsSUFBSUUsT0FBTyxHQUFHLEVBQWQ7QUFDQSxJQUFJQyxFQUFFLEdBQUcsU0FBVDtBQUNBLElBQUlDLEVBQUUsR0FBRyxHQUFUO0FBQ0EsSUFBSUMsRUFBRSxHQUFHLEdBQVQ7O0FBRUEsU0FBU0MsSUFBVCxDQUFjQyxJQUFkLEVBQW9CQyxHQUFwQixFQUF5QkMsRUFBekIsRUFBNkJDLE1BQTdCO0FBQ0E7QUFDQyxNQUFJQyxDQUFDLEdBQUdDLENBQUMsQ0FBQ0wsSUFBRCxFQUFNQyxHQUFOLEVBQVVDLEVBQVYsQ0FBVDtBQUNBSSxFQUFBQSxRQUFRLENBQUNDLEtBQVQsQ0FBZSxjQUFZWCxFQUFaLEdBQWVRLENBQWYsR0FBaUJELE1BQWpCLEdBQXdCLElBQXhCLEdBQTZCQyxDQUE3QixHQUErQixNQUE5QztBQUNBO0FBQ0QsU0FBU0ksS0FBVCxDQUFlUixJQUFmLEVBQXFCQyxHQUFyQixFQUEwQkMsRUFBMUIsRUFBOEJDLE1BQTlCLEVBQXNDTSxPQUF0QztBQUNBO0FBQ0NILEVBQUFBLFFBQVEsQ0FBQ0MsS0FBVCxDQUFlLGNBQVlYLEVBQVosR0FBZVMsQ0FBQyxDQUFDTCxJQUFELEVBQU1DLEdBQU4sRUFBVUMsRUFBVixDQUFoQixHQUE4QkMsTUFBOUIsR0FBcUMsSUFBckMsR0FBMENNLE9BQTFDLEdBQWtELE1BQWpFO0FBQ0E7QUFDRCxTQUFTSixDQUFULENBQVdMLElBQVgsRUFBaUJDLEdBQWpCLEVBQXNCQyxFQUF0QjtBQUNBO0FBQ0MsTUFBSUUsQ0FBQyxHQUFHSixJQUFJLEdBQUNILEVBQWI7QUFDQSxNQUFJSyxFQUFFLElBQUUsQ0FBQyxDQUFUO0FBQ0E7QUFDQ0UsSUFBQUEsQ0FBQyxJQUFHSCxHQUFKO0FBQ0EsUUFBSUMsRUFBRSxJQUFFLENBQVI7QUFDQ0UsSUFBQUEsQ0FBQyxJQUFHTixFQUFFLEdBQUNMLElBQUksQ0FBQ1MsRUFBRCxDQUFYO0FBQ0QsR0FMRDs7QUFPQ0UsRUFBQUEsQ0FBQyxJQUFHTSxPQUFPLENBQUNULEdBQUQsQ0FBWDtBQUNELFNBQU9HLENBQVA7QUFDQTtBQUNELFNBQVNNLE9BQVQsQ0FBaUJDLENBQWpCO0FBQ0E7QUFDQyxNQUFJUCxDQUFDLEdBQUcsRUFBUjtBQUNBLE9BQUssSUFBSVEsQ0FBQyxHQUFDLENBQVgsRUFBY0EsQ0FBQyxHQUFDRCxDQUFDLENBQUNFLE1BQWxCLEVBQTBCRCxDQUFDLElBQUUsQ0FBN0I7QUFDQyxRQUFJQSxDQUFDLEdBQUMsQ0FBRixJQUFLRCxDQUFDLENBQUNFLE1BQVg7QUFDQ1QsSUFBQUEsQ0FBQyxJQUFHTyxDQUFDLENBQUNHLE1BQUYsQ0FBU0YsQ0FBVCxDQUFKLENBREQ7O0FBR0NSLElBQUFBLENBQUMsSUFBR08sQ0FBQyxDQUFDRyxNQUFGLENBQVNGLENBQUMsR0FBQyxDQUFYLElBQWNELENBQUMsQ0FBQ0csTUFBRixDQUFTRixDQUFULENBQWxCLENBSkY7QUFLQSxTQUFPUixDQUFDLENBQUNXLE9BQUYsQ0FBVSxLQUFWLEVBQWdCLEdBQWhCLENBQVA7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIEVtYWlsLmpzIHZlcnNpb24gNVxyXG52YXIgdGxkXyA9IG5ldyBBcnJheSgpXHJcbnRsZF9bMF0gPSBcImNvbVwiO1xyXG50bGRfWzFdID0gXCJvcmdcIjtcclxudGxkX1syXSA9IFwibmV0XCI7XHJcbnRsZF9bM10gPSBcIndzXCI7XHJcbnRsZF9bNF0gPSBcImluZm9cIjtcclxudGxkX1sxMF0gPSBcImNvLnVrXCI7XHJcbnRsZF9bMTFdID0gXCJvcmcudWtcIjtcclxudGxkX1sxMl0gPSBcImdvdi51a1wiO1xyXG50bGRfWzEzXSA9IFwiYWMudWtcIjtcclxudmFyIHRvcERvbV8gPSAxMztcclxudmFyIG1fID0gXCJtYWlsdG86XCI7XHJcbnZhciBhXyA9IFwiQFwiO1xyXG52YXIgZF8gPSBcIi5cIjtcclxuXHJcbmZ1bmN0aW9uIG1haWwobmFtZSwgZG9tLCB0bCwgcGFyYW1zKVxyXG57XHJcblx0dmFyIHMgPSBlKG5hbWUsZG9tLHRsKTtcclxuXHRkb2N1bWVudC53cml0ZSgnPGEgaHJlZj1cIicrbV8rcytwYXJhbXMrJ1wiPicrcysnPC9hPicpO1xyXG59XHJcbmZ1bmN0aW9uIG1haWwyKG5hbWUsIGRvbSwgdGwsIHBhcmFtcywgZGlzcGxheSlcclxue1xyXG5cdGRvY3VtZW50LndyaXRlKCc8YSBocmVmPVwiJyttXytlKG5hbWUsZG9tLHRsKStwYXJhbXMrJ1wiPicrZGlzcGxheSsnPC9hPicpO1xyXG59XHJcbmZ1bmN0aW9uIGUobmFtZSwgZG9tLCB0bClcclxue1xyXG5cdHZhciBzID0gbmFtZSthXztcclxuXHRpZiAodGwhPS0yKVxyXG5cdHtcclxuXHRcdHMrPSBkb207XHJcblx0XHRpZiAodGw+PTApXHJcblx0XHRcdHMrPSBkXyt0bGRfW3RsXTtcclxuXHR9XHJcblx0ZWxzZVxyXG5cdFx0cys9IHN3YXBwZXIoZG9tKTtcclxuXHRyZXR1cm4gcztcclxufVxyXG5mdW5jdGlvbiBzd2FwcGVyKGQpXHJcbntcclxuXHR2YXIgcyA9IFwiXCI7XHJcblx0Zm9yICh2YXIgaT0wOyBpPGQubGVuZ3RoOyBpKz0yKVxyXG5cdFx0aWYgKGkrMT09ZC5sZW5ndGgpXHJcblx0XHRcdHMrPSBkLmNoYXJBdChpKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRzKz0gZC5jaGFyQXQoaSsxKStkLmNoYXJBdChpKTtcclxuXHRyZXR1cm4gcy5yZXBsYWNlKC9cXD8vZywnLicpO1xyXG59Il0sImZpbGUiOiJlbWFpbC5qcyJ9