import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStateSlice } from "./slice/lruSlice";
import { selectState } from "./slice/lruSlice/selectors";
import { Button, InputNumber, Table } from "antd";

const HomePage = (): JSX.Element => {
  const { actions: stateActions } = useStateSlice();
  const state = useSelector(selectState);

  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState<number>(0);
  const [newKey, setNewKey] = useState<number>(0);
  const [newValue, setNewValue] = useState<number>(0);

  const [newGetKey, setNewGetKey] = useState<number>(0);

  const [newDeleteKey, setNewDeleteKey] = useState<number>(0);

  const updateCategory = () =>
    dispatch(stateActions.updateCategory(newCategory));

  const putFunction = () => {
    dispatch(stateActions.putCache({ key: newKey, value: newValue }));
    setNewKey(0);
    setNewValue(0);
  };

  const getFunction = () => {
    dispatch(stateActions.getCatch(newGetKey));
    setNewGetKey(0);
  };

  const deleteFunction = () => {
    dispatch(stateActions.deleteCatch(newDeleteKey));
    setNewDeleteKey(0);
  };

  React.useEffect(() => {
    console.log(state.lruCache);
  }, [state]);

  const columns = [
    {
      title: "key",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "value",
      dataIndex: "value",
      key: "value",
    },
  ];

  return (
    <>
      <div>
        <h1>LRU Values</h1>
        <p>category: {state.lruCache ? state.lruCache.category : ""}</p>
        <div>
          <>new category :</>
          <InputNumber
            value={newCategory}
            onChange={(v) => setNewCategory(v ? v : 0)}
          />
          <Button onClick={() => updateCategory()}>update</Button>
        </div>
        <Table
          dataSource={state.lruCache ? state.lruCache.LRUCache : []}
          columns={columns}
        />
        <div>
          <p>result: {state.lruCache ? state.lruCache.result : ""}</p>
        </div>
        <div>
          <p>LRU put</p>
          <>key: </>
          <InputNumber value={newKey} onChange={(v) => setNewKey(v ? v : 0)} />
          <>value: </>
          <InputNumber
            value={newValue}
            onChange={(v) => setNewValue(v ? v : 0)}
          />
          <Button onClick={() => putFunction()}>put</Button>
        </div>
        <div>
          <p>LRU get</p>
          <>key: </>
          <InputNumber
            value={newGetKey}
            onChange={(v) => setNewGetKey(v ? v : 0)}
          />
          <Button onClick={() => getFunction()}>get</Button>
        </div>
        <div>
          <p>LRU delete</p>
          <>key: </>
          <InputNumber
            value={newDeleteKey}
            onChange={(v) => setNewDeleteKey(v ? v : 0)}
          />
          <Button onClick={() => deleteFunction()}>delete</Button>
        </div>
      </div>
    </>
  );
};

export default HomePage;
