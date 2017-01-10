/**
 * Created by Pathik on 06-01-2017.
 */

//add jq-select plugin
import "../src/plugin";


import "./index.scss";


let $input = $(".dropdown");
$input.jqSelect({
    "data": "qwe"
});
