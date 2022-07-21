import * as React from 'react';
import { Box, Button, Collapse, Hidden, makeStyles, Typography } from "@material-ui/core";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Switch, { switchClasses } from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './style.scss'

export function SortedDescendingIcon() {
  return <ExpandMoreIcon fontSize='small' htmlColor="#a1a7ac" />
}
export function SortedAscendingIcon() {
  return <ExpandLessIcon fontSize='small' htmlColor="#a1a7ac" />
}
export function MuiMoreVertIcon() {
  return <MoreVertIcon fontSize='small' htmlColor="#a1a7ac" />
}


export default function WalletTable() {

  const theme = createTheme({
    components: {
      MuiSwitch: {
        defaultProps: {
          color: 'default',
        },
        styleOverrides: {
          root: {
            '& .MuiSwitch-switchBase': {
              position: "absolute",
              color: "#a1a7ac"
            }
          },
        }
      },
      MuiButton: {
        defaultProps: {
          border: '0px',
          outline: '0px'
        },
        styleOverrides: {
          root: {
            '& .MuiButton-buttonBase': {
              border: '0px',
              outline: '0px'
            }
          }
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input, .MuiInput-input, .css-15e8ec1-MuiInputBase-input-MuiInput-input": {
              color: "#a1a7ac",
              backgroundColor: "#1e1f22 !important"
            }
          },
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiFormLabel-root": {
              color: "#a1a7ac",
            },
            "& .MuiInputLabel-root": {
              color: "#a1a7ac",
            }
          },
        }
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            "& .MuiFormLabel-root": {
              color: "#a1a7ac !important",
            },
            "& .MuiInputLabel-root": {
              color: "#a1a7ac !important",
            },
            "& .MuiInputBase-formControl:after": {
              borderBottom: '#7987a1',
            },
            "& .MuiInputBase-formControl:hover": {
              borderBottom: '#7987a1',
            }
          },
        }
      }
    }

  });

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Rank', width: 100 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'tokenAmount', headerName: 'Token Amount', width: 150 },
    {
      field: 'totalBalance',
      headerName: 'Total Balance',
      // type: 'number',
      width: 150,
    },
    {
      field: 'tokenChange',
      headerName: 'Change',
      description: 'This column has a value getter and is not sortable.',
      // type: 'number',
      width: 100
    },
  ];

  const rows = [
    { id: 1, address: '0x0391be54e72f7e001f6bbc331777710b4f2999ef', tokenAmount: 1, totalBalance: 35, tokenChange: -4 },
    { id: 2, address: '0x1111111111111111111111111111111111111111', tokenAmount: 2, totalBalance: 42, tokehange: -3 },
    { id: 3, address: '0x1111111111111111111111111111111111111112', tokenAmount: 3, totalBalance: 45, tokenChange: -2 },
    { id: 4, address: '0x1111111111111111111111111111111111111113', tokenAmount: 4, totalBalance: 16, tokenChange: -1 },
    { id: 5, address: '0x1111111111111111111111111111111111111114', tokenAmount: 5, totalBalance: 23, tokenChange: 0 },
    { id: 6, address: '0x1111111111111111111111111111111111111115', tokenAmount: 6, totalBalance: 150, tokenChange: 1 },
    { id: 7, address: '0x1111111111111111111111111111111111111116', tokenAmount: 7, totalBalance: 44, tokenChange: 2 },
    { id: 8, address: '0x1111111111111111111111111111111111111117', tokenAmount: 8, totalBalance: 36, tokenChange: 3 },
    { id: 9, address: '0x1111111111111111111111111111111111111118', tokenAmount: 9, totalBalance: 65, tokenChange: 4 },
    { id: 11, address: '0x0391be54e72f7e001f6bbc331777710b4f2999ef', tokenAmount: 1, totalBalance: 35, tokenChange: -4 },
    { id: 12, address: '0x1111111111111111111111111111111111111111', tokenAmount: 2, totalBalance: 42, tokehange: -3 },
    { id: 13, address: '0x1111111111111111111111111111111111111112', tokenAmount: 3, totalBalance: 45, tokenChange: -2 },
    { id: 14, address: '0x1111111111111111111111111111111111111113', tokenAmount: 4, totalBalance: 16, tokenChange: -1 },
    { id: 15, address: '0x1111111111111111111111111111111111111114', tokenAmount: 5, totalBalance: 23, tokenChange: 0 },
    { id: 16, address: '0x1111111111111111111111111111111111111115', tokenAmount: 6, totalBalance: 150, tokenChange: 1 },
    { id: 17, address: '0x1111111111111111111111111111111111111116', tokenAmount: 7, totalBalance: 44, tokenChange: 2 },
    { id: 18, address: '0x1111111111111111111111111111111111111117', tokenAmount: 8, totalBalance: 36, tokenChange: 3 },
    { id: 19, address: '0x1111111111111111111111111111111111111118', tokenAmount: 9, totalBalance: 65, tokenChange: 4 }
  ];

  return (
    // <div style={{ height: 400, width: '100%' }}>
    <div style={{ height: 600, width: '720px' }}>
      <ThemeProvider theme={theme}>

        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onRowClick={() => { console.log() }}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          components={{
            ColumnSortedDescendingIcon: SortedDescendingIcon,
            ColumnSortedAscendingIcon: SortedAscendingIcon,
            ColumnMenuIcon: MuiMoreVertIcon
          }}
          componentsProps={{
            baseCheckbox: {
              sx: {
                color: "#a1a7ac", backgroundColor: "#1e1f22", option: {
                  backgroundColor: "#1e1f22"
                }
              }
            },
            baseTextField: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
            baseSelect: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
            baseTooltip: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
            baseButton: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
            baseSwitch: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
            basePopper: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
            cell: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22" } },
            columnHeaderFilterIconButton: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22", } },
            header: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22", borderBottom: `1px solid #323546` } },
            columnMenu: { sx: { color: "#a1a7ac", backgroundColor: "#1e1f22", } },        // menu
            columnsPanel: { sx: { color: "#a1a7ac", backgroundColor: '#1e1f22' } },      // menu show columns
            filterPanel: { sx: { backgroundColor: '#1e1f22' } },                          // menu filter
            footer: { sx: { color: "#a1a7ac", backgroundColor: '#1e1f22', borderTop: `1px solid #323546` } },                               // footer background
            pagination: { sx: { color: "#a1a7ac", backgroundColor: '#1e1f22' } },                                    // footer filter 
          }}

          sx={{
            color: "#a1a7ac",
            border: `1px solid #323546`,

            '&.MuiDataGrid-iconSeparator': {
              display: 'none',
            },
            '&.MuiDataGrid-root': {
              backgroundColor: "#1e1f22",
              color: "#a1a7ac",
            },
            "&.MuiDataGrid-columnHeaders": {
              backgroundColor: "#1e1f22",
              color: "#a1a7ac",
              fontSize: 16,
              border: `1px solid #323546 !important`
            },
            "&.MuiInput-input": {
              backgroundColor: "#1e1f22",
              color: "#a1a7ac"
            },
            "&.MuiSwitch-thumb css-jsexje-MuiSwitch-thumb": {
              backgroundColor: "#1e1f22 !important",
              color: "#a1a7ac !important"
            },
            '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
              borderBottom: `0.5px solid ${'#1e1f22'}`,
            },
            '& .MuiDataGrid-row': {
              backgroundColor: 'rgb(23, 23, 26)',
              color: '#a1a7ac',
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#2d2f33',
              color: '#a1a7ac'
            },
            '& *::-webkit-scrollbar': {
              backgroundColor: '#202022',
            },
            '& *::-webkit-scrollbar-thumb': {
              borderRadius: 8,
              backgroundColor: "#585859",
              minHeight: 24,
              border: `3px solid #202022`,
            },
            '& *::-webkit-scrollbar-thumb:focus': {
              backgroundColor: "#838384",
            },
            '& *::-webkit-scrollbar-thumb:active': {
              backgroundColor: "#838384",
            },
            '& *::-webkit-scrollbar-thumb:hover': {
              backgroundColor: "#838384",
            },
            '& *::-webkit-scrollbar-corner': {
              backgroundColor: "#202022",
            },
            '& .MuiDataGrid-overlay': {
              backgroundColor: '#2d2f33'
            },
            '& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-cell:focus-within': {
              outline: `solid 0px`,
              outlineColor: "#a1a7ac"
            },
            '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus': {
              outline: `solid 0px`,
              outlineColor: "#a1a7ac"
            },
            '&.Mui-selected': {
              backgroundColor: "#2d2f33",
              '&:hover': "#2d2f33",
              '@media (hover: none)': {
                backgroundColor: "#2d2f33",
              },
              '& select > option': {
                backgroundColor: "#2d2f33 !important"
              }
            }
          }}
        />
      </ThemeProvider>

    </div>

  );
}
