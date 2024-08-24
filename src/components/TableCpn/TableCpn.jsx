import React, { useMemo, useState } from 'react'
import { Button, Divider, Table } from 'antd';
import { Excel } from "antd-table-saveas-excel";

const TableCpn = (props) => {
    const { selectionType = 'checkbox', data = [], columns = [], onDeleteUserMany, onDeleteProductMany } = props
    const [rowSelectedKey, setRowSelectedKey] = useState([])
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKey(selectedRowKeys)
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    };
    const newColumsExport = useMemo(() => {
        const arr = columns?.filter((col) => col.dataIndex !== 'action')
        return arr
    }, [columns])
    const handleDeleteManyUser = () => {
        onDeleteUserMany(rowSelectedKey)
    }
    const handleDeleteManyProduct = () => {
        onDeleteProductMany(rowSelectedKey)
    }
    const exportExcel = () => {
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(newColumsExport)
            .addDataSource(data, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
    };
    // console.log('data:', data)
    return (
        <div className='table_cpn'>
            <Button onClick={exportExcel} type="primary" style={{ marginTop: '20px' }}>Export Excel</Button>
            <Divider />
            {rowSelectedKey.length > 0 && (
                <div className="delete_many">
                    <Button onClick={handleDeleteManyUser} style={{ marginRight: '10px', marginBottom: '20px' }} className='delete_many-item' type="primary">Xoá Chọn User</Button>
                    <Button onClick={handleDeleteManyProduct} style={{ marginRight: '10px', marginBottom: '20px' }} className='delete_many-item' type="primary">Xoá Chọn Product</Button>
                </div>
            )}
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </div>
    )
}

export default TableCpn
