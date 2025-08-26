import React from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@mui/material";
import { green } from "@mui/material/colors";

interface Column {
    label: string;
    key: string;
}

interface TableCustomProps {
    columns: Column[];
    data: Record<string, any>[];
}

const TableCustom: React.FC<TableCustomProps> = ({ columns, data }) => {
    return (
        <Table>
            <TableHead
                sx={{
                    bgcolor: green[900],
                    color: 'white',
                }}
            >
                <TableRow>
                    {columns.map((col) => (
                        <TableCell
                            key={col.key}
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                fontSize: '1.5vw',
                            }}
                        >{col.label}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((row, idx) => (
                    <TableRow
                        key={idx}
                        sx={{
                            backgroundColor: idx % 2 === 0 ? "#f5f5f5" : "white",
                            "&:hover": {
                                backgroundColor: "#e3f2fd",
                            },
                        }}
                    >
                        {columns.map((col) => (
                            <TableCell
                                key={col.key}
                                sx={{
                                    fontSize: "1.2vw",
                                    paddingY: 1.5,
                                    paddingX: 2,
                                }}
                            >{row[col.key]}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableCustom;
