import "./styles.css";
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";

export enum Position {
    Left = "left",
    Center = "center",
    Right = "right",
}

interface FilterOption {
    value: string;
    description: string;
}

interface Column {
    title?: string;
    dataIndex: string;
    sticky?: boolean;
    align?: {
        column?: Position;
        row?: Position;
    };
    filter?: FilterOption[];
    width?: number;
    render?: (row: any) => React.ReactNode;
}

interface PaginationProps {
    currentPage: number;
    total: number;
    size: number;
    onChange: (page: number) => void;
}

interface TableProps {
    data?: any[];
    columns?: Column[];
    className?: string;
    selected?: number;
    currentUser?: any[];
    loading?: boolean;
    bodyRow?: {
        onClick: (row: any) => void;
    };
    pagination?: PaginationProps;
}

const Table: React.FC<TableProps> = ({
    data = [],
    columns = [],
    className = "",
    selected = -1,
    currentUser = [],
    loading = false,
    bodyRow = {
        onClick: () => undefined,
    },
    pagination = {
        currentPage: 0,
        total: 20,
        size: 20,
        onChange: () => undefined,
    },
}) => {
    const [currentPage, setCurrentPage] = useState(pagination.currentPage);
    const [selectedRow, setSelectedRow] = useState(selected);
    const [visibleFilter, setVisibleFilter] = useState<string | null>(null);
    const [filterConditions, setFilterConditions] = useState<{ column: string; columnValue: string }[]>([]);

    const filteredData = useMemo(() => {
        if (filterConditions.length === 0) return data;
        return data.filter(row =>
            filterConditions.every(cond => row[cond.column] === cond.columnValue)
        );
    }, [data, filterConditions]);

    const handleFilterClick = (dataIndex: string) => {
        setVisibleFilter(prev => (prev === dataIndex ? null : dataIndex));
    };

    const handleFilterChange = (dataIndex: string, value: string) => {
        setFilterConditions(prevConditions => {
            const exists = prevConditions.some(
                cond => cond.column === dataIndex && cond.columnValue === value
            );
            if (exists) {
                return prevConditions.filter(
                    cond => !(cond.column === dataIndex && cond.columnValue === value)
                );
            }
            return [...prevConditions, { column: dataIndex, columnValue: value }];
        });
    };

    useEffect(() => {
        setCurrentPage(pagination.currentPage);
    }, [pagination.currentPage]);

    //#region Calulate Column width dynamic
    // Calculate total width of specified columns
    const totalSpecifiedWidth = columns.reduce((total, col) => {
        if (col.width) {
            return total + Number(col.width);
        }
        return total;
    }, 0);

    // Calculate the width for columns without specified width
    const remainingColumnsCount = columns.filter(col => !col.width).length;
    const remainingWidth = remainingColumnsCount > 0
        ? `calc((100% - ${totalSpecifiedWidth}px) / ${remainingColumnsCount})`
        : "auto";
    //#endregion

    return (
        <div className={`custom-table-container ${className}`}>
            <table className="custom-table" cellSpacing={0} style={{ borderSpacing: 0, borderCollapse: "collapse" }}>
                <thead className="custom-table-thead">
                    <tr className="custom-table-thead-tr">
                        {columns.map((col, colIndex) => (
                            <th
                                key={colIndex}
                                className={`custom-table-thead-tr-th
                                    ${col.sticky ? "custom-table-thead-tr-th-sticky" : ""}`}
                                style={{ width: col.width ? `${col.width}px` : remainingWidth }}
                            >
                                <div className={`custom-table-thead-tr-th-content
                                    ${col.align?.column === Position.Center && !col.filter ? "custom-justify-center" :
                                        col.align?.column === Position.Right && !col.filter ? "custom-justify-end" : ""}`}
                                >
                                    {col.title ?? ""}
                                    {col.filter && (
                                        <>
                                            <div className="custom-table-icon">
                                                <Icon
                                                    icon={"teenyicons:filter-outline"}
                                                    className="custom-cursor-pointer"
                                                    onClick={() => handleFilterClick(col.dataIndex)}
                                                />
                                            </div>
                                            {visibleFilter === col.dataIndex && (
                                                <div className="custom-table-thead-tr-th-content-filter">
                                                    {col.filter.map((filterOption, index) => (
                                                        <div
                                                            key={index}
                                                            className="custom-table-thead-tr-th-content-filter-container"
                                                            onClick={() =>
                                                                handleFilterChange(col.dataIndex, filterOption.value)
                                                            }
                                                        >
                                                            <input
                                                                checked={filterConditions.some(
                                                                    cond =>
                                                                        cond.column === col.dataIndex &&
                                                                        cond.columnValue === filterOption.value
                                                                )}
                                                                type="checkbox"
                                                                name={`checked-checkbox_${index}`} id={`checked-checkbox_${index}`}
                                                                className="custom-table-thead-tr-th-content-filter-input"
                                                            />
                                                            <label
                                                                htmlFor={`checked-checkbox_${index}`}
                                                                className="custom-table-thead-tr-th-content-filter-label"
                                                            >
                                                                {filterOption.description}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="custom-table-tbody">
                    {loading ? (
                        <tr className="custom-table-tbody-tr-loading">
                            <td colSpan={columns.length} className="custom-text-center">
                                {/* Loader */}
                            </td>
                        </tr>
                    ) : filteredData.length > 0 ? (
                        filteredData.map((row, rowIndex) => {
                            const isSelected = selectedRow === rowIndex;
                            const isCurrentUser = currentUser.includes(row?.code);
                            return (
                                <tr
                                    key={rowIndex}
                                    className="custom-table-tbody-tr"
                                    onClick={() => {
                                        bodyRow.onClick(row);
                                        setSelectedRow(rowIndex);
                                    }}
                                >
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className={`custom-table-tbody-tr-td 
                                                ${isCurrentUser ? "custom-table-tbody-tr-td-current_user" : ""}
                                                ${isSelected ? "custom-table-tbody-tr-td-selected" : ""}
                                                ${col.sticky ? "custom-table-tbody-tr-td-sticky" : ""}
                                                ${col.align?.row === Position.Center ? "custom-text-center" :
                                                    col.align?.row === Position.Right ? "custom-text-end" : ""}`}
                                            style={{ width: col.width ? `${col.width}px` : remainingWidth}}
                                        >
                                            {col.render ? col.render(row) : row[col.dataIndex]}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
                    ) : (
                        <tr className="custom-table-tbody-tr-nodata">
                            <td colSpan={columns.length} className="custom-table-tbody-tr-nodata-td custom-text-center">
                                {/* No Data Image */}NO DATA
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {filteredData.length > 0 && (
                <div className="pagination-container">
                    {/* Pagination Component */}
                </div>
            )}
        </div>
    );
};

export default Table;
