// import { useState } from 'react';

// export default function Example(params = 0) {

//    const [num, setNum] = useState(params);

//   return [num, setNum]
// }

import React, {useContext, useEffect} from 'react';
import {context} from "./context";
import * as mainAction from "./context/main/mainAction";
import {getJson} from "./util";

function App() {
    const {state, dispatch} = useContext(context).main;

    // 设计内部变量ignore，并且在ignore为True时改变状态，
    // 最后返回一个执行操作，目的在于组件卸载时，禁止修改状态
    useEffect(() => {
        let ignore = false;
        const getData = async () => {
            try {
                dispatch(mainAction.pageLoading(true));
                const res = await getJson(state.url);
                if (!ignore) {
                    dispatch(mainAction.initPage(res));
                }
                dispatch(mainAction.pageLoading(false));
            } catch (err) {
                if (!ignore) {
                    dispatch(mainAction.changeError(err.message));
                }
            }
        };
        getData();
        return () => {
            ignore = true
        };
    }, [state.url, dispatch]);  // 只在url更改的时候执行

    return (
        <div>
            <div>
                <button onClick={() => dispatch(mainAction.toSearch(state.url + '?bagName=224-truck2_2019-05-09-14-28-19_41-0'))}>search</button>
                {state.res.map(item =>
                    <p key={item.id}>{item.bagName}</p>
                )}
            </div>
        </div>
    );
}

export default App;
