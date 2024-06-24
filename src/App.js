"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Unstable_Grid2_1 = require("@mui/material/Unstable_Grid2"); // Grid version 2
require("./App.css");
function App() {
    return (<Unstable_Grid2_1.default container spacing={5}>
    <Unstable_Grid2_1.default xs={12} sm={4} md={3} lg={2}>1</Unstable_Grid2_1.default>
    <Unstable_Grid2_1.default xs={6} sm={4} md={3} lg={2}>2</Unstable_Grid2_1.default>
    <Unstable_Grid2_1.default xs={6} sm={4} md={3} lg={2}>3</Unstable_Grid2_1.default>
    <Unstable_Grid2_1.default xs={12} sm={4} md={3} lg={2}>4</Unstable_Grid2_1.default>
    <Unstable_Grid2_1.default xs={6} sm={4} md={6} lg={2}>5</Unstable_Grid2_1.default>
    <Unstable_Grid2_1.default xs={6} sm={4} md={6} lg={2}>6</Unstable_Grid2_1.default>
    </Unstable_Grid2_1.default>);
}
exports.default = App;
