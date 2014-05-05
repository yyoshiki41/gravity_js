var box = document.getElementById('def_box'),
    box_h = box.clientHeight,
    box_w = box.clientWidth,
    gravity_off = document.getElementById('gravity_off'),
    gravity_on = document.getElementById('gravity_on');

var x = y = x_e = y_e = 0,
    r = 5,
    g = 10,
    e = 0.9,
    sx = sy = sx_e =  5,
    vy_e = 0,
    V0y_e = 0,
    t_per = 0.03,
    t_sum = 0,
    t_bound = 0;

// 無重力
var zero_gravity = function () {
    x += sx;
    y += sy;
    if(x <= 0 || x > box_w - (2 * r)) {
        x = x <= 0 ? 0 : box_w - (2 * r);
        sx *= -1;
    }
    if(y <= 0 || y > box_h - (2 * r)) {
        y = y <= 0 ? 0 : box_h - (2 * r);
        sy *= -1;
    }
    gravity_off.style.left = x + 'px';
    gravity_off.style.top = y + 'px';
}
// 重力場/非弾性衝突(e=0.9)
var inelastic_collision = function () {
    t_sum += t_per;
    vy_e = V0y_e + g * (t_sum - t_bound);
    x_e += sx_e;
    y_e += vy_e;
    if(x_e <= 0 || x_e > box_w - (2 * r)) {
        x_e = x_e <= 0 ? 0 : box_w - (2 * r);
        sx_e *= -1 * e;
    }
    if(y_e > box_h - (2 * r)) {
        y_e = box_h - (2 * r);
        if(vy_e < 0) {
            return;
        } else {
            t_bound = t_sum;
            V0y_e = -1 * e * vy_e;
        }
    }
    gravity_on.style.left = x_e + 'px';
    gravity_on.style.top = y_e + 'px';
}
function f() {
    zero_gravity();
    inelastic_collision();

    setTimeout('f()', t_per * 1000);
}
f();
