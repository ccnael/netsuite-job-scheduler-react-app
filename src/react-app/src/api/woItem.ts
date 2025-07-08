
import { suiteletUrl } from '@/lib/constants';
import { isLocalDevelopment } from '@/lib/helpers';

export interface WOItem {
  id: string;
  workorder: {
    text: string;
    value: string;
  };
  salesorder: {
    text: string;
    value: string;
  };
  event: string;
  uuid: string;
  line: string;
  item: {
    text: string;
    value: string;
  };
  description: string;
  quantity: number;
  availableQty: number;
  note: string;
  quantityReceived: number;
  completedQty: number;
}

// Mockup data for local development
const mockWOItems: WOItem[] = [{
    "id": "10",
    "workorder": {
      "text": "Install Walls",
      "value": "7"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_3",
    "line": "3",
    "item": {
      "text": "BAG00002",
      "value": "837"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "107",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_1",
    "line": "1",
    "item": {
      "text": "343",
      "value": "1343"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "108",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_21",
    "line": "2",
    "item": {
      "text": "VZCC-0060-HSS1",
      "value": "2835"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "109",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_22",
    "line": "3",
    "item": {
      "text": "VZCC-0048-A",
      "value": "1146"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "110",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_23",
    "line": "4",
    "item": {
      "text": "VZCC-0018-A",
      "value": "1312"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "111",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_24",
    "line": "5",
    "item": {
      "text": "VZCC-0060-A",
      "value": "1037"
    },
    "description": "",
    "quantity": 15,
    "availableQty": 15,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "112",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_25",
    "line": "6",
    "item": {
      "text": "VZCC-0030-A",
      "value": "1145"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "113",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_26",
    "line": "7",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "114",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_1",
    "line": "1",
    "item": {
      "text": "343",
      "value": "1343"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "115",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_21",
    "line": "2",
    "item": {
      "text": "VZCC-0060-HSS1",
      "value": "2835"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "116",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_22",
    "line": "3",
    "item": {
      "text": "VZCC-0048-A",
      "value": "1146"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "117",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_23",
    "line": "4",
    "item": {
      "text": "VZCC-0018-A",
      "value": "1312"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "118",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_24",
    "line": "5",
    "item": {
      "text": "VZCC-0060-A",
      "value": "1037"
    },
    "description": "",
    "quantity": 15,
    "availableQty": 15,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "119",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_25",
    "line": "6",
    "item": {
      "text": "VZCC-0030-A",
      "value": "1145"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "120",
    "workorder": {
      "text": "Test FOP Dry Run2",
      "value": "73"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000718",
      "value": "19391"
    },
    "event": "",
    "uuid": "19391_26",
    "line": "7",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "121",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "122",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "123",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "124",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "125",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "126",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "127",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "128",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "129",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "13",
    "workorder": {
      "text": "Install Walls",
      "value": "14"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "130",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "131",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "132",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "133",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "134",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "135",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "136",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "137",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "138",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "139",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "14",
    "workorder": {
      "text": "Install Walls",
      "value": "14"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_3",
    "line": "3",
    "item": {
      "text": "BAG00002",
      "value": "837"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "140",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "141",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "142",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "143",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "144",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "145",
    "workorder": {
      "text": "Test Work Order 3",
      "value": "78"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000726",
      "value": "19400"
    },
    "event": "",
    "uuid": "19400_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "146",
    "workorder": {
      "text": "Test Work Order 3",
      "value": "78"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000726",
      "value": "19400"
    },
    "event": "",
    "uuid": "19400_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "149",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "150",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_2",
    "line": "2",
    "item": {
      "text": "VZCC-0060-W",
      "value": "1068"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "151",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_3",
    "line": "3",
    "item": {
      "text": "VZCC-0060-A",
      "value": "1037"
    },
    "description": "",
    "quantity": 15,
    "availableQty": 15,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "152",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_4",
    "line": "4",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "153",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_5",
    "line": "5",
    "item": {
      "text": "VZCC-0048-A",
      "value": "1146"
    },
    "description": "",
    "quantity": 25,
    "availableQty": 25,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "154",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "155",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_2",
    "line": "2",
    "item": {
      "text": "VZCC-0060-W",
      "value": "1068"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "156",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_3",
    "line": "3",
    "item": {
      "text": "VZCC-0060-A",
      "value": "1037"
    },
    "description": "",
    "quantity": 15,
    "availableQty": 15,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "157",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_4",
    "line": "4",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "158",
    "workorder": {
      "text": "FOP User Guide ",
      "value": "80"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_5",
    "line": "5",
    "item": {
      "text": "VZCC-0048-A",
      "value": "1146"
    },
    "description": "",
    "quantity": 25,
    "availableQty": 25,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "159",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "160",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_2",
    "line": "2",
    "item": {
      "text": "VZCC-0060-W",
      "value": "1068"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "161",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_3",
    "line": "3",
    "item": {
      "text": "VZCC-0060-A",
      "value": "1037"
    },
    "description": "",
    "quantity": 15,
    "availableQty": 15,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "162",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_4",
    "line": "4",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "163",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_5",
    "line": "5",
    "item": {
      "text": "VZCC-0048-A",
      "value": "1146"
    },
    "description": "",
    "quantity": 25,
    "availableQty": 25,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "164",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "165",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_2",
    "line": "2",
    "item": {
      "text": "VZCC-0060-W",
      "value": "1068"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "166",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_3",
    "line": "3",
    "item": {
      "text": "VZCC-0060-A",
      "value": "1037"
    },
    "description": "",
    "quantity": 15,
    "availableQty": 15,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "167",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_4",
    "line": "4",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "168",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_5",
    "line": "5",
    "item": {
      "text": "VZCC-0048-A",
      "value": "1146"
    },
    "description": "",
    "quantity": 25,
    "availableQty": 25,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "169",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "170",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "171",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "172",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "173",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "174",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "",
    "uuid": "19414_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 50,
    "availableQty": 50,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "175",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "",
    "uuid": "19414_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "176",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100880",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "177",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100880",
    "uuid": "19414_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "178",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100881",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "179",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100882",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "180",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100883",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "181",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100884",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "182",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100885",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "183",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100886",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "184",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100887",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "185",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100888",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "186",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100889",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "187",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100890",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "188",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100891",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "200",
    "workorder": {
      "text": "Work Order Test 4",
      "value": "79"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000726",
      "value": "19400"
    },
    "event": "100898",
    "uuid": "19400_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "201",
    "workorder": {
      "text": "Work Order Test 4",
      "value": "79"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000726",
      "value": "19400"
    },
    "event": "100898",
    "uuid": "19400_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "202",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100899",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "203",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100900",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "204",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100901",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "205",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100902",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "206",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100903",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "207",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100904",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "208",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100905",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "209",
    "workorder": {
      "text": "Work Order Test **Do not use** - Mei",
      "value": "82"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000734",
      "value": "19414"
    },
    "event": "100906",
    "uuid": "19414_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "210",
    "workorder": {
      "text": "Work Order Test 4",
      "value": "79"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000726",
      "value": "19400"
    },
    "event": "100907",
    "uuid": "19400_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "211",
    "workorder": {
      "text": "Work Order Test 4",
      "value": "79"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000726",
      "value": "19400"
    },
    "event": "100907",
    "uuid": "19400_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "216",
    "workorder": {
      "text": "Work Order Test 4",
      "value": "79"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000726",
      "value": "19400"
    },
    "event": "",
    "uuid": "19400_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "217",
    "workorder": {
      "text": "Work Order Test 4",
      "value": "79"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000726",
      "value": "19400"
    },
    "event": "",
    "uuid": "19400_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "219",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000736",
      "value": "19418"
    },
    "event": "",
    "uuid": "19418_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "220",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000736",
      "value": "19418"
    },
    "event": "100912",
    "uuid": "19418_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "221",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000736",
      "value": "19418"
    },
    "event": "100913",
    "uuid": "19418_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "224",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000736",
      "value": "19418"
    },
    "event": "100915",
    "uuid": "19418_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "225",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000736",
      "value": "19418"
    },
    "event": "100916",
    "uuid": "19418_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "226",
    "workorder": {
      "text": "Test Work order",
      "value": "84"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "227",
    "workorder": {
      "text": "Test Work order",
      "value": "84"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_2",
    "line": "2",
    "item": {
      "text": "VZCC-0060-W",
      "value": "1068"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "228",
    "workorder": {
      "text": "Test Work order",
      "value": "84"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_3",
    "line": "3",
    "item": {
      "text": "VZCC-0060-A",
      "value": "1037"
    },
    "description": "",
    "quantity": 15,
    "availableQty": 15,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "229",
    "workorder": {
      "text": "Test Work order",
      "value": "84"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_4",
    "line": "4",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "230",
    "workorder": {
      "text": "Test Work order",
      "value": "84"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000733",
      "value": "19413"
    },
    "event": "",
    "uuid": "19413_5",
    "line": "5",
    "item": {
      "text": "VZCC-0048-A",
      "value": "1146"
    },
    "description": "",
    "quantity": 25,
    "availableQty": 25,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "232",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "",
    "uuid": "19521_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "236",
    "workorder": {
      "text": "Work Order Test 4",
      "value": "79"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000726",
      "value": "19400"
    },
    "event": "100921",
    "uuid": "19400_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "237",
    "workorder": {
      "text": "Work Order Test 4",
      "value": "79"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000726",
      "value": "19400"
    },
    "event": "100921",
    "uuid": "19400_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "45",
    "workorder": {
      "text": "Furniture Installation",
      "value": "45"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16210_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "56",
    "workorder": {
      "text": "Furniture Installation",
      "value": "58"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "59",
    "workorder": {
      "text": "Furniture Installation",
      "value": "59"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "62",
    "workorder": {
      "text": "Furniture Installation",
      "value": "60"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "104",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "106",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "43",
    "workorder": {
      "text": "Furniture Installation",
      "value": "44"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16210_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "41",
    "workorder": {
      "text": "Furniture Installation",
      "value": "43"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16210_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "246",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "",
    "uuid": "20024_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 50,
    "availableQty": 50,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "362",
    "workorder": {
      "text": "Furniture Installation",
      "value": "99"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "",
    "uuid": "20024_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 50,
    "availableQty": 50,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "384",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000769",
      "value": "20898"
    },
    "event": "",
    "uuid": "20898_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "241",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "",
    "uuid": "19521_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 50,
    "availableQty": 50,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "238",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100922",
    "uuid": "19521_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "239",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100923",
    "uuid": "19521_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "240",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100924",
    "uuid": "19521_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "242",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "",
    "uuid": "19521_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "244",
    "workorder": {
      "text": "1 Oct Test Work Order",
      "value": "72"
    },
    "salesorder": {
      "text": " ",
      "value": ""
    },
    "event": "100930",
    "uuid": "",
    "line": "",
    "item": {
      "text": "136-3643",
      "value": "1432"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "this is test memo",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "249",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "",
    "uuid": "20024_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "251",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "100931",
    "uuid": "20024_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 50,
    "availableQty": 50,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "254",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "100933",
    "uuid": "20024_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "26",
    "workorder": {
      "text": "SLS00000621_WRKORDR001",
      "value": "32"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000621",
      "value": "13089"
    },
    "event": "",
    "uuid": "13089_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "261",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100938",
    "uuid": "19521_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "266",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100942",
    "uuid": "19521_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "27",
    "workorder": {
      "text": "SLS00000621_WRKORDR001",
      "value": "32"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000621",
      "value": "13089"
    },
    "event": "",
    "uuid": "13089_2",
    "line": "2",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "272",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100946",
    "uuid": "19521_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 50,
    "availableQty": 50,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "274",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100947",
    "uuid": "19521_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 50,
    "availableQty": 50,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "275",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100947",
    "uuid": "19521_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "278",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "100950",
    "uuid": "20024_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "280",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "100952",
    "uuid": "20024_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "281",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "100953",
    "uuid": "20024_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "282",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "100954",
    "uuid": "20024_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "283",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100955",
    "uuid": "19521_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 50,
    "availableQty": 50,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "284",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100955",
    "uuid": "19521_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "285",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000736",
      "value": "19418"
    },
    "event": "100956",
    "uuid": "19418_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "288",
    "workorder": {
      "text": "Test Dry Run Oct 31",
      "value": "88"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000746",
      "value": "20845"
    },
    "event": "",
    "uuid": "20845_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "289",
    "workorder": {
      "text": "Test Dry Run Oct 31",
      "value": "88"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000746",
      "value": "20845"
    },
    "event": "",
    "uuid": "20845_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "290",
    "workorder": {
      "text": "Work Order Oct 31 - Mei",
      "value": "89"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000746",
      "value": "20845"
    },
    "event": "",
    "uuid": "20845_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "291",
    "workorder": {
      "text": "Work Order Oct 31 - Mei",
      "value": "89"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000746",
      "value": "20845"
    },
    "event": "",
    "uuid": "20845_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "292",
    "workorder": {
      "text": "Work Order Oct 31 - Mei",
      "value": "89"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000746",
      "value": "20845"
    },
    "event": "",
    "uuid": "20845_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "293",
    "workorder": {
      "text": "Work Order Oct 31 - Mei",
      "value": "89"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000746",
      "value": "20845"
    },
    "event": "",
    "uuid": "20845_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "294",
    "workorder": {
      "text": "Work Order Oct 31 - Mei",
      "value": "89"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000746",
      "value": "20845"
    },
    "event": "",
    "uuid": "20845_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "295",
    "workorder": {
      "text": "Work Order Oct 31 - Mei",
      "value": "89"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000746",
      "value": "20845"
    },
    "event": "",
    "uuid": "20845_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "296",
    "workorder": {
      "text": "Work Order Oct 31 - Mei",
      "value": "89"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000746",
      "value": "20845"
    },
    "event": "",
    "uuid": "20845_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "297",
    "workorder": {
      "text": "Work Order Oct 31 - Mei",
      "value": "89"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000746",
      "value": "20845"
    },
    "event": "",
    "uuid": "20845_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "298",
    "workorder": {
      "text": "Test WO",
      "value": "90"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000746",
      "value": "20845"
    },
    "event": "",
    "uuid": "20845_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "299",
    "workorder": {
      "text": "Work Order - Oct 31",
      "value": "91"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000747",
      "value": "20851"
    },
    "event": "",
    "uuid": "20851_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "3",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "2"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "30",
    "workorder": {
      "text": "Flooring Installation",
      "value": "31"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "",
      "value": ""
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "300",
    "workorder": {
      "text": "Work Order - Oct 31",
      "value": "91"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000747",
      "value": "20851"
    },
    "event": "",
    "uuid": "20851_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "301",
    "workorder": {
      "text": "Work Order - Oct 31",
      "value": "91"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000747",
      "value": "20851"
    },
    "event": "",
    "uuid": "20851_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "302",
    "workorder": {
      "text": "Work Order - Oct 31",
      "value": "91"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000747",
      "value": "20851"
    },
    "event": "",
    "uuid": "20851_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "303",
    "workorder": {
      "text": "Work Order - Oct 31",
      "value": "91"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000747",
      "value": "20851"
    },
    "event": "",
    "uuid": "20851_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "31",
    "workorder": {
      "text": "Flooring Installation",
      "value": "31"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_2",
    "line": "2",
    "item": {
      "text": "",
      "value": ""
    },
    "description": "",
    "quantity": 4,
    "availableQty": 4,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "310",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000713",
      "value": "19372"
    },
    "event": "100968",
    "uuid": "19372_1",
    "line": "1",
    "item": {
      "text": "LOT00001",
      "value": "677"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 626,
    "completedQty": 0
  },
  {
    "id": "311",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000713",
      "value": "19372"
    },
    "event": "100968",
    "uuid": "19372_2",
    "line": "2",
    "item": {
      "text": "LOT00002",
      "value": "678"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 726,
    "completedQty": 0
  },
  {
    "id": "312",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100970",
    "uuid": "19521_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 50,
    "availableQty": 50,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "313",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "100970",
    "uuid": "19521_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "32",
    "workorder": {
      "text": "Flooring Installation",
      "value": "31"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "",
      "value": ""
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "320",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "101003",
    "uuid": "19521_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 40,
    "availableQty": 40,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "321",
    "workorder": {
      "text": "Furniture Installation",
      "value": "86"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "101003",
    "uuid": "19521_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "323",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000748",
      "value": "20852"
    },
    "event": "",
    "uuid": "20852_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "324",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000748",
      "value": "20852"
    },
    "event": "101006",
    "uuid": "20852_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "325",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000748",
      "value": "20852"
    },
    "event": "101007",
    "uuid": "20852_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "326",
    "workorder": {
      "text": "Work Order - Oct 31 - Test 1",
      "value": "92"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000748",
      "value": "20852"
    },
    "event": "101008",
    "uuid": "20852_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "329",
    "workorder": {
      "text": "Work Order Nov 4 - Test only",
      "value": "93"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000748",
      "value": "20852"
    },
    "event": "",
    "uuid": "20852_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 200,
    "availableQty": 200,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "33",
    "workorder": {
      "text": "Flooring Installation",
      "value": "31"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_2",
    "line": "2",
    "item": {
      "text": "",
      "value": ""
    },
    "description": "",
    "quantity": 4,
    "availableQty": 4,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "330",
    "workorder": {
      "text": "Work Order Nov 4 - Test only",
      "value": "93"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000748",
      "value": "20852"
    },
    "event": "",
    "uuid": "20852_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "331",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000750",
      "value": "20867"
    },
    "event": "",
    "uuid": "20867_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "332",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000750",
      "value": "20867"
    },
    "event": "",
    "uuid": "20867_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "333",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000751",
      "value": "20868"
    },
    "event": "",
    "uuid": "20868_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 500,
    "availableQty": 500,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "334",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000751",
      "value": "20868"
    },
    "event": "",
    "uuid": "20868_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "335",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000751",
      "value": "20868"
    },
    "event": "101010",
    "uuid": "20868_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "336",
    "workorder": {
      "text": "Work Order - Nov 4 Dry run",
      "value": "95"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000751",
      "value": "20868"
    },
    "event": "101010",
    "uuid": "20868_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "34",
    "workorder": {
      "text": "Flooring Installation",
      "value": "31"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "",
      "value": ""
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "342",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000750",
      "value": "20867"
    },
    "event": "101011",
    "uuid": "20867_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "381",
    "workorder": {
      "text": "Furniture Installation",
      "value": "38"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000655",
      "value": "16212"
    },
    "event": "",
    "uuid": "16212_1",
    "line": "1",
    "item": {
      "text": "343",
      "value": "1343"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "382",
    "workorder": {
      "text": "Furniture Installation",
      "value": "38"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000655",
      "value": "16212"
    },
    "event": "",
    "uuid": "16212_15",
    "line": "2",
    "item": {
      "text": "343",
      "value": "1343"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "344",
    "workorder": {
      "text": "Test Work Order - Nov 4",
      "value": "94"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000750",
      "value": "20867"
    },
    "event": "101011",
    "uuid": "20867_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "35",
    "workorder": {
      "text": "Flooring Installation",
      "value": "31"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_2",
    "line": "2",
    "item": {
      "text": "",
      "value": ""
    },
    "description": "",
    "quantity": 4,
    "availableQty": 4,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "357",
    "workorder": {
      "text": "Work Order for Testing Nov 5 -3",
      "value": "98"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000755",
      "value": "20872"
    },
    "event": "",
    "uuid": "20872_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "358",
    "workorder": {
      "text": "Work Order for Testing Nov 5 -3",
      "value": "98"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000755",
      "value": "20872"
    },
    "event": "",
    "uuid": "20872_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "369",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000766",
      "value": "20892"
    },
    "event": "",
    "uuid": "20892_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 50,
    "availableQty": 50,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "370",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000766",
      "value": "20892"
    },
    "event": "101015",
    "uuid": "20892_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "371",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000766",
      "value": "20892"
    },
    "event": "101015",
    "uuid": "20892_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "38",
    "workorder": {
      "text": "Furniture and Flooring Installation",
      "value": "34"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000651",
      "value": "15100"
    },
    "event": "",
    "uuid": "15100_22",
    "line": "4",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "387",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000769",
      "value": "20898"
    },
    "event": "101028",
    "uuid": "20898_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "388",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000769",
      "value": "20898"
    },
    "event": "101028",
    "uuid": "20898_3",
    "line": "3",
    "item": {
      "text": "45XQ-2424-LJ4SCA",
      "value": "1013"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "39",
    "workorder": {
      "text": "Work Order aug 1 test",
      "value": "36"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000655",
      "value": "16212"
    },
    "event": "",
    "uuid": "16212_1",
    "line": "1",
    "item": {
      "text": "343",
      "value": "1343"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "392",
    "workorder": {
      "text": "AV Installation Only",
      "value": "104"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000770",
      "value": "20899"
    },
    "event": "101029",
    "uuid": "20899_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "394",
    "workorder": {
      "text": "Furniture Installation",
      "value": "105"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000770",
      "value": "20899"
    },
    "event": "101031",
    "uuid": "20899_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "4",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "2"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_2",
    "line": "2",
    "item": {
      "text": "7031-0501",
      "value": "1047"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "40",
    "workorder": {
      "text": "Work Order aug 1 test",
      "value": "37"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000655",
      "value": "16212"
    },
    "event": "",
    "uuid": "16212_1",
    "line": "1",
    "item": {
      "text": "343",
      "value": "1343"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "400",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_1",
    "line": "1",
    "item": {
      "text": "CON00001",
      "value": "713"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "401",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_2",
    "line": "2",
    "item": {
      "text": "MNT00001",
      "value": "642"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "407",
    "workorder": {
      "text": "Install Cove Lights - Follow Up",
      "value": "107"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_1",
    "line": "1",
    "item": {
      "text": "CON00001",
      "value": "713"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "408",
    "workorder": {
      "text": "Install Cove Lights - Follow Up",
      "value": "107"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_2",
    "line": "2",
    "item": {
      "text": "MNT00001",
      "value": "642"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "413",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "101032",
    "uuid": "20900_1",
    "line": "1",
    "item": {
      "text": "CON00001",
      "value": "713"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "414",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "101032",
    "uuid": "20900_4",
    "line": "4",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "415",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "101033",
    "uuid": "20900_1",
    "line": "1",
    "item": {
      "text": "CON00001",
      "value": "713"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "416",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "101033",
    "uuid": "20900_5",
    "line": "5",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "417",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "101034",
    "uuid": "20900_3",
    "line": "3",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "418",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "101034",
    "uuid": "20900_4",
    "line": "4",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "419",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "101034",
    "uuid": "20900_5",
    "line": "5",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "42",
    "workorder": {
      "text": "Furniture Installation",
      "value": "43"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16211_10",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "420",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "101034",
    "uuid": "20900_6",
    "line": "6",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "421",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "101034",
    "uuid": "20900_7",
    "line": "7",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  },
  {
    "id": "432",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "",
    "uuid": "20903_1",
    "line": "1",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "Dealer Service Fee",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "1",
    "workorder": {
      "text": "Furniture Installation",
      "value": "1"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "11",
    "workorder": {
      "text": "Walls Installation",
      "value": "13"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "15",
    "workorder": {
      "text": "Drop off and Walls Installation",
      "value": "15"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "20",
    "workorder": {
      "text": "Conference Table Delivery",
      "value": "28"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "21",
    "workorder": {
      "text": "Security Camera Installation",
      "value": "29"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "23",
    "workorder": {
      "text": "Flooring Installation ",
      "value": "30"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "24",
    "workorder": {
      "text": "Flooring Installation",
      "value": "31"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "28",
    "workorder": {
      "text": "AV Installation",
      "value": "33"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "377",
    "workorder": {
      "text": "Desks Installation",
      "value": "20"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "434",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "101036",
    "uuid": "20903_1",
    "line": "1",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "435",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "101037",
    "uuid": "20903_1",
    "line": "1",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "44",
    "workorder": {
      "text": "Furniture Installation",
      "value": "44"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16211_10",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "446",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "",
    "uuid": "20905_1",
    "line": "1",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "451",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "101038",
    "uuid": "20905_7",
    "line": "7",
    "item": {
      "text": "J2HB-5124-SS1RS1",
      "value": "2036"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "452",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "101038",
    "uuid": "20905_8",
    "line": "8",
    "item": {
      "text": "JCTB-24S1",
      "value": "2037"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "453",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "101038",
    "uuid": "20905_9",
    "line": "9",
    "item": {
      "text": "JPMA-24-S1CS1",
      "value": "2038"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "454",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "101038",
    "uuid": "20905_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "455",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "101038",
    "uuid": "20905_10",
    "line": "10",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "456",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "101038",
    "uuid": "20905_3",
    "line": "3",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "457",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "101038",
    "uuid": "20905_11",
    "line": "11",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "458",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "101038",
    "uuid": "20905_4",
    "line": "4",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "459",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "101038",
    "uuid": "20905_5",
    "line": "5",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "363",
    "workorder": {
      "text": "Furniture Installation",
      "value": "99"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "",
    "uuid": "20024_3",
    "line": "3",
    "item": {
      "text": "45XQ-2424-LJ4SCA",
      "value": "1013"
    },
    "description": "",
    "quantity": 30,
    "availableQty": 30,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "63",
    "workorder": {
      "text": "Furniture Installation",
      "value": "60"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_3",
    "line": "3",
    "item": {
      "text": "45XQ-2424-LJ4SCA",
      "value": "1013"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "60",
    "workorder": {
      "text": "Furniture Installation",
      "value": "59"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_3",
    "line": "3",
    "item": {
      "text": "45XQ-2424-LJ4SCA",
      "value": "1013"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "57",
    "workorder": {
      "text": "Furniture Installation",
      "value": "58"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_3",
    "line": "3",
    "item": {
      "text": "45XQ-2424-LJ4SCA",
      "value": "1013"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "385",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000769",
      "value": "20898"
    },
    "event": "",
    "uuid": "20898_3",
    "line": "3",
    "item": {
      "text": "45XQ-2424-LJ4SCA",
      "value": "1013"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "46",
    "workorder": {
      "text": "Furniture Installation",
      "value": "45"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16211_10",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "460",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "101039",
    "uuid": "20905_1",
    "line": "1",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "461",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "101040",
    "uuid": "20905_1",
    "line": "1",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "462",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000777",
      "value": "20906"
    },
    "event": "101041",
    "uuid": "20906_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "463",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000777",
      "value": "20906"
    },
    "event": "101041",
    "uuid": "20906_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "464",
    "workorder": {
      "text": "Furniture Installation",
      "value": "105"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000770",
      "value": "20899"
    },
    "event": "101042",
    "uuid": "20899_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "469",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000778",
      "value": "20907"
    },
    "event": "101043",
    "uuid": "20907_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "470",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000778",
      "value": "20907"
    },
    "event": "101043",
    "uuid": "20907_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "475",
    "workorder": {
      "text": "Furniture Delivery",
      "value": "113"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000779",
      "value": "20908"
    },
    "event": "101045",
    "uuid": "20908_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "476",
    "workorder": {
      "text": "Furniture Delivery",
      "value": "113"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000779",
      "value": "20908"
    },
    "event": "101045",
    "uuid": "20908_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "477",
    "workorder": {
      "text": "Furniture Delivery",
      "value": "113"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000779",
      "value": "20908"
    },
    "event": "101045",
    "uuid": "20908_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "478",
    "workorder": {
      "text": "Furniture Delivery",
      "value": "113"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000779",
      "value": "20908"
    },
    "event": "101045",
    "uuid": "20908_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 4,
    "availableQty": 4,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "48",
    "workorder": {
      "text": "Furniture Installation",
      "value": "46"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16211_10",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "492",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000781",
      "value": "20911"
    },
    "event": "101049",
    "uuid": "20911_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Trail Bike - Maverik Disc",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "493",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000781",
      "value": "20911"
    },
    "event": "101049",
    "uuid": "20911_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Trail Bike - Maverik Disc",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "494",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000781",
      "value": "20911"
    },
    "event": "101049",
    "uuid": "20911_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Trail Bike - Maverik Disc",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "495",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000781",
      "value": "20911"
    },
    "event": "101049",
    "uuid": "20911_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Trail Bike - Maverik Disc",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "50",
    "workorder": {
      "text": "AV Installation",
      "value": "47"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16211_10",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "509",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000782",
      "value": "20914"
    },
    "event": "",
    "uuid": "20914_1",
    "line": "1",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "Dealer Service Fee",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "512",
    "workorder": {
      "text": "Furniture Installation",
      "value": "117"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000783",
      "value": "20915"
    },
    "event": "101051",
    "uuid": "20915_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "513",
    "workorder": {
      "text": "Furniture Installation",
      "value": "117"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000783",
      "value": "20915"
    },
    "event": "101051",
    "uuid": "20915_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "52",
    "workorder": {
      "text": "Flooring Installation",
      "value": "48"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16211_10",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "522",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "101052",
    "uuid": "20917_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "523",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "101052",
    "uuid": "20917_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "524",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "101052",
    "uuid": "20917_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "525",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "101052",
    "uuid": "20917_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "53",
    "workorder": {
      "text": "Work Order Test - Sept 12 - Mei",
      "value": "49"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16210_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "531",
    "workorder": {
      "text": "Furniture Installation",
      "value": "121"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000786",
      "value": "20919"
    },
    "event": "101055",
    "uuid": "20919_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "532",
    "workorder": {
      "text": "Furniture Installation",
      "value": "121"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000786",
      "value": "20919"
    },
    "event": "101055",
    "uuid": "20919_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "54",
    "workorder": {
      "text": "Work Order Test - Sept 12 - Mei",
      "value": "49"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16210_3",
    "line": "3",
    "item": {
      "text": "45XQ-2424-LJ4SCA",
      "value": "1013"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "542",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000795",
      "value": "22459"
    },
    "event": "",
    "uuid": "22459_11",
    "line": "6",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "Dealer Service Fee",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "543",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000795",
      "value": "22459"
    },
    "event": "",
    "uuid": "22459_12",
    "line": "7",
    "item": {
      "text": "BUR00001",
      "value": "736"
    },
    "description": "BUR00001",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "544",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000795",
      "value": "22459"
    },
    "event": "",
    "uuid": "22459_13",
    "line": "8",
    "item": {
      "text": "CON00001",
      "value": "713"
    },
    "description": "CON00001",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "55",
    "workorder": {
      "text": "Work Order Test - Sept 12 - Mei",
      "value": "49"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16211_10",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "558",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "101078",
    "uuid": "22468_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "560",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "101080",
    "uuid": "22468_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "565",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "101082",
    "uuid": "22468_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "567",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "101083",
    "uuid": "22468_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "574",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "101084",
    "uuid": "22468_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "579",
    "workorder": {
      "text": "Lobby Area",
      "value": "125"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000807",
      "value": "22898"
    },
    "event": "101085",
    "uuid": "22898_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 3,
    "availableQty": 3,
    "note": "Test",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "58",
    "workorder": {
      "text": "Furniture Installation",
      "value": "58"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "580",
    "workorder": {
      "text": "Lobby Area",
      "value": "125"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000807",
      "value": "22898"
    },
    "event": "101085",
    "uuid": "22898_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "Test",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "605",
    "workorder": {
      "text": "Lobby Area",
      "value": "134"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000811",
      "value": "22902"
    },
    "event": "101096",
    "uuid": "22902_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 1
  },
  {
    "id": "606",
    "workorder": {
      "text": "Office Area 1",
      "value": "132"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000810",
      "value": "22901"
    },
    "event": "101097",
    "uuid": "22901_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "607",
    "workorder": {
      "text": "Office Area 1",
      "value": "132"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000810",
      "value": "22901"
    },
    "event": "101099",
    "uuid": "22901_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "61",
    "workorder": {
      "text": "Furniture Installation",
      "value": "59"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "634",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000826",
      "value": "23471"
    },
    "event": "101124",
    "uuid": "23471_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "636",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000826",
      "value": "23471"
    },
    "event": "101126",
    "uuid": "23471_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "64",
    "workorder": {
      "text": "Furniture Installation",
      "value": "60"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "66",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "662",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000837",
      "value": "24432"
    },
    "event": "101134",
    "uuid": "24432_6",
    "line": "6",
    "item": {
      "text": "J2HB-5124-SS1RS1",
      "value": "2036"
    },
    "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 3
  },
  {
    "id": "663",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000837",
      "value": "24432"
    },
    "event": "101134",
    "uuid": "24432_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 1
  },
  {
    "id": "67",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": " ",
      "value": ""
    },
    "event": "",
    "uuid": "17729_4",
    "line": "undefined",
    "item": {
      "text": "ACQUA/CARAVEL AU0641",
      "value": "1062"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "671",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000848",
      "value": "25472"
    },
    "event": "101138",
    "uuid": "",
    "line": "7",
    "item": {
      "text": "JCTB-24S1",
      "value": "2037"
    },
    "description": "X Series,Pedestal,Cushion Top Kit, 24\"D",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 3
  },
  {
    "id": "672",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000848",
      "value": "25472"
    },
    "event": "101138",
    "uuid": "",
    "line": "8",
    "item": {
      "text": "JPMA-24-S1CS1",
      "value": "2038"
    },
    "description": "X Series,Pedestal,Mobile,B/F,24\"D,PtdDrwFrt, Stl Lkrl,Ellipse Pull,Cstr,No Top",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 3
  },
  {
    "id": "673",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000837",
      "value": "24432"
    },
    "event": "101146",
    "uuid": "24432_6",
    "line": "6",
    "item": {
      "text": "J2HB-5124-SS1RS1",
      "value": "2036"
    },
    "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "674",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000836",
      "value": "24428"
    },
    "event": "101149",
    "uuid": "24428_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "676",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000836",
      "value": "24428"
    },
    "event": "",
    "uuid": "24428_15",
    "line": "",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "Dealer Service Fee",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "68",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": " ",
      "value": ""
    },
    "event": "",
    "uuid": "17729_5",
    "line": "undefined",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "69",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": " ",
      "value": ""
    },
    "event": "",
    "uuid": "17729_4",
    "line": "4",
    "item": {
      "text": "ACQUA/CARAVEL AU0641",
      "value": "1062"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "70",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": " ",
      "value": ""
    },
    "event": "",
    "uuid": "17729_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "17",
    "workorder": {
      "text": "Drop off and Walls Installation",
      "value": "15"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_2",
    "line": "2",
    "item": {
      "text": "7031-0501",
      "value": "1047"
    },
    "description": "",
    "quantity": 7,
    "availableQty": 7,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "25",
    "workorder": {
      "text": "Flooring Installation",
      "value": "31"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_2",
    "line": "2",
    "item": {
      "text": "7031-0501",
      "value": "1047"
    },
    "description": "",
    "quantity": 4,
    "availableQty": 4,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "29",
    "workorder": {
      "text": "AV Installation",
      "value": "33"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_2",
    "line": "2",
    "item": {
      "text": "7031-0501",
      "value": "1047"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "378",
    "workorder": {
      "text": "Desks Installation",
      "value": "20"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_2",
    "line": "2",
    "item": {
      "text": "7031-0501",
      "value": "1047"
    },
    "description": "",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "71",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": " ",
      "value": ""
    },
    "event": "",
    "uuid": "17729_4",
    "line": "4",
    "item": {
      "text": "ACQUA/CARAVEL AU0641",
      "value": "1062"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "72",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": " ",
      "value": ""
    },
    "event": "",
    "uuid": "17729_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "73",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": " ",
      "value": ""
    },
    "event": "",
    "uuid": "17729_4",
    "line": "4",
    "item": {
      "text": "ACQUA/CARAVEL AU0641",
      "value": "1062"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "74",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": " ",
      "value": ""
    },
    "event": "",
    "uuid": "17729_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "75",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_4",
    "line": "4",
    "item": {
      "text": "ACQUA/CARAVEL AU0641",
      "value": "1062"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "76",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "77",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000713",
      "value": "19372"
    },
    "event": "",
    "uuid": "19372_1",
    "line": "1",
    "item": {
      "text": "LOT00001",
      "value": "677"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 626,
    "completedQty": 0
  },
  {
    "id": "78",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000713",
      "value": "19372"
    },
    "event": "",
    "uuid": "19372_2",
    "line": "2",
    "item": {
      "text": "LOT00002",
      "value": "678"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 726,
    "completedQty": 0
  },
  {
    "id": "79",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "8",
    "workorder": {
      "text": "Install Walls",
      "value": "7"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_1",
    "line": "1",
    "item": {
      "text": "4321GR",
      "value": "1015"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "80",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_2",
    "line": "2",
    "item": {
      "text": "2375-6727",
      "value": "1426"
    },
    "description": "",
    "quantity": 25,
    "availableQty": 25,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "81",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_5",
    "line": "5",
    "item": {
      "text": "Dealer Service Fee",
      "value": "2331"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "9",
    "workorder": {
      "text": "Install Walls",
      "value": "7"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_2",
    "line": "2",
    "item": {
      "text": "7031-0501",
      "value": "1047"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "564",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": " ",
      "value": ""
    },
    "event": "36",
    "uuid": "",
    "line": "",
    "item": {
      "text": "PRI00002",
      "value": "38"
    },
    "description": "",
    "quantity": 999,
    "availableQty": 999,
    "note": "",
    "quantityReceived": 15,
    "completedQty": 0
  },
  {
    "id": "562",
    "workorder": {
      "text": "FOP User Guide TEST",
      "value": "81"
    },
    "salesorder": {
      "text": " ",
      "value": ""
    },
    "event": "36",
    "uuid": "",
    "line": "",
    "item": {
      "text": "PRI00002",
      "value": "38"
    },
    "description": "",
    "quantity": 999,
    "availableQty": 999,
    "note": "",
    "quantityReceived": 15,
    "completedQty": 0
  },
  {
    "id": "65",
    "workorder": {
      "text": "Furniture Installation",
      "value": "61"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000686",
      "value": "17729"
    },
    "event": "",
    "uuid": "17729_4",
    "line": "4",
    "item": {
      "text": "ACQUA/CARAVEL AU0641",
      "value": "1062"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "386",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000769",
      "value": "20898"
    },
    "event": "",
    "uuid": "20898_4",
    "line": "4",
    "item": {
      "text": "ACQUA/CARAVEL AU0641",
      "value": "1062"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "364",
    "workorder": {
      "text": "Furniture Installation",
      "value": "99"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "",
    "uuid": "20024_4",
    "line": "4",
    "item": {
      "text": "ACQUA/CARAVEL AU0641",
      "value": "1062"
    },
    "description": "",
    "quantity": 100,
    "availableQty": 100,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "2",
    "workorder": {
      "text": "Furniture Installation",
      "value": "1"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_3",
    "line": "3",
    "item": {
      "text": "BAG00002",
      "value": "837"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "12",
    "workorder": {
      "text": "Walls Installation",
      "value": "13"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_3",
    "line": "3",
    "item": {
      "text": "BAG00002",
      "value": "837"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "379",
    "workorder": {
      "text": "Desks Installation",
      "value": "20"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_3",
    "line": "3",
    "item": {
      "text": "BAG00002",
      "value": "837"
    },
    "description": "",
    "quantity": 50,
    "availableQty": 50,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "22",
    "workorder": {
      "text": "Security Camera Installation",
      "value": "29"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_3",
    "line": "3",
    "item": {
      "text": "BAG00002",
      "value": "837"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "18",
    "workorder": {
      "text": "Drop off and Walls Installation",
      "value": "15"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_3",
    "line": "3",
    "item": {
      "text": "BAG00002",
      "value": "837"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "527",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "120"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "",
    "uuid": "20917_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "528",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "120"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "101054",
    "uuid": "20917_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "529",
    "workorder": {
      "text": "Furniture Installation",
      "value": "121"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000786",
      "value": "20919"
    },
    "event": "",
    "uuid": "20919_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "530",
    "workorder": {
      "text": "Furniture Installation",
      "value": "121"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000786",
      "value": "20919"
    },
    "event": "",
    "uuid": "20919_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "533",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000786",
      "value": "20919"
    },
    "event": "101057",
    "uuid": "20919_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "534",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000786",
      "value": "20919"
    },
    "event": "101057",
    "uuid": "20919_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "535",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "101060",
    "uuid": "20917_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "536",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "101060",
    "uuid": "20917_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "545",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000778",
      "value": "20907"
    },
    "event": "101061",
    "uuid": "20907_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "546",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "",
    "uuid": "22468_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 7,
    "availableQty": 7,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "547",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "101062",
    "uuid": "22468_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 7,
    "availableQty": 7,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "548",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "",
    "uuid": "22468_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "549",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "",
    "uuid": "22468_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "550",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "",
    "uuid": "22468_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "555",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "101075",
    "uuid": "22468_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "556",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "101075",
    "uuid": "22468_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "557",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "101077",
    "uuid": "22468_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 7,
    "availableQty": 7,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "559",
    "workorder": {
      "text": "Test Work Order - AC Installation",
      "value": "123"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "101079",
    "uuid": "22468_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "575",
    "workorder": {
      "text": "Testing with Lean",
      "value": "124"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "",
    "uuid": "22468_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": -17,
    "availableQty": -17,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "576",
    "workorder": {
      "text": "Testing with Lean",
      "value": "124"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000803",
      "value": "22468"
    },
    "event": "",
    "uuid": "22468_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": -10,
    "availableQty": -10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "577",
    "workorder": {
      "text": "Lobby Area",
      "value": "125"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000807",
      "value": "22898"
    },
    "event": "",
    "uuid": "22898_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 7,
    "availableQty": 7,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "578",
    "workorder": {
      "text": "Lobby Area",
      "value": "125"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000807",
      "value": "22898"
    },
    "event": "",
    "uuid": "22898_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "581",
    "workorder": {
      "text": "Office Room A",
      "value": "126"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000807",
      "value": "22898"
    },
    "event": "",
    "uuid": "22898_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "582",
    "workorder": {
      "text": "Office Room A",
      "value": "126"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000807",
      "value": "22898"
    },
    "event": "",
    "uuid": "22898_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "583",
    "workorder": {
      "text": "Office Room B",
      "value": "127"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000807",
      "value": "22898"
    },
    "event": "",
    "uuid": "22898_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "584",
    "workorder": {
      "text": "Office Room B",
      "value": "127"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000807",
      "value": "22898"
    },
    "event": "",
    "uuid": "22898_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "585",
    "workorder": {
      "text": "Lobby Area",
      "value": "128"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000808",
      "value": "22899"
    },
    "event": "",
    "uuid": "22899_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "586",
    "workorder": {
      "text": "Lobby Area",
      "value": "128"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000808",
      "value": "22899"
    },
    "event": "",
    "uuid": "22899_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "587",
    "workorder": {
      "text": "Lobby Area",
      "value": "129"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000809",
      "value": "22900"
    },
    "event": "",
    "uuid": "22900_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "588",
    "workorder": {
      "text": "Lobby Area",
      "value": "129"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000809",
      "value": "22900"
    },
    "event": "",
    "uuid": "22900_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "589",
    "workorder": {
      "text": "Office Room A",
      "value": "130"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000809",
      "value": "22900"
    },
    "event": "",
    "uuid": "22900_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "590",
    "workorder": {
      "text": "Office Room A",
      "value": "130"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000809",
      "value": "22900"
    },
    "event": "",
    "uuid": "22900_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "591",
    "workorder": {
      "text": "Office Room A",
      "value": "130"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000809",
      "value": "22900"
    },
    "event": "",
    "uuid": "22900_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "592",
    "workorder": {
      "text": "Lobby Area",
      "value": "131"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000810",
      "value": "22901"
    },
    "event": "",
    "uuid": "22901_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "593",
    "workorder": {
      "text": "Office Area 1",
      "value": "132"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000810",
      "value": "22901"
    },
    "event": "",
    "uuid": "22901_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 4,
    "availableQty": 4,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "594",
    "workorder": {
      "text": "Office Room 2",
      "value": "133"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000810",
      "value": "22901"
    },
    "event": "",
    "uuid": "22901_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "595",
    "workorder": {
      "text": "Office Room 2",
      "value": "133"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000810",
      "value": "22901"
    },
    "event": "",
    "uuid": "22901_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "596",
    "workorder": {
      "text": "Office Room 2",
      "value": "133"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000810",
      "value": "22901"
    },
    "event": "",
    "uuid": "22901_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "597",
    "workorder": {
      "text": "Office Room 2",
      "value": "133"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000810",
      "value": "22901"
    },
    "event": "",
    "uuid": "22901_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "598",
    "workorder": {
      "text": "Lobby Area",
      "value": "134"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000811",
      "value": "22902"
    },
    "event": "",
    "uuid": "22902_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "599",
    "workorder": {
      "text": "Office Area 1",
      "value": "132"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000810",
      "value": "22901"
    },
    "event": "101087",
    "uuid": "22901_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 4,
    "availableQty": 4,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "600",
    "workorder": {
      "text": "Office Area 1",
      "value": "132"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000810",
      "value": "22901"
    },
    "event": "101088",
    "uuid": "22901_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 4,
    "availableQty": 4,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "601",
    "workorder": {
      "text": "Creation of New Work Order",
      "value": "135"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000811",
      "value": "22902"
    },
    "event": "101095",
    "uuid": "22902_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "604",
    "workorder": {
      "text": "Creation of New Work Order",
      "value": "135"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000811",
      "value": "22902"
    },
    "event": "101095",
    "uuid": "22902_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "609",
    "workorder": {
      "text": "Lobby Area 1",
      "value": "136"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000818",
      "value": "22934"
    },
    "event": "",
    "uuid": "22934_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 7,
    "availableQty": 7,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "610",
    "workorder": {
      "text": "Lobby Area 1",
      "value": "136"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000818",
      "value": "22934"
    },
    "event": "",
    "uuid": "22934_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "611",
    "workorder": {
      "text": "Lobby Area 1",
      "value": "136"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000818",
      "value": "22934"
    },
    "event": "",
    "uuid": "22934_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "36",
    "workorder": {
      "text": "Furniture and Flooring Installation",
      "value": "34"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000651",
      "value": "15100"
    },
    "event": "",
    "uuid": "15100_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "37",
    "workorder": {
      "text": "Furniture and Flooring Installation",
      "value": "34"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000651",
      "value": "15100"
    },
    "event": "",
    "uuid": "15100_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "47",
    "workorder": {
      "text": "Furniture Installation",
      "value": "46"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16210_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "49",
    "workorder": {
      "text": "AV Installation",
      "value": "47"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16210_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "51",
    "workorder": {
      "text": "Flooring Installation",
      "value": "48"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000654",
      "value": "16211"
    },
    "event": "",
    "uuid": "16210_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 0,
    "availableQty": 0,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "103",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "105",
    "workorder": {
      "text": "Furniture Installation",
      "value": "67"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000715",
      "value": "19388"
    },
    "event": "",
    "uuid": "19388_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "218",
    "workorder": {
      "text": "Furniture Installation",
      "value": "83"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000736",
      "value": "19418"
    },
    "event": "",
    "uuid": "19418_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "231",
    "workorder": {
      "text": "Furniture Installation",
      "value": "85"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000739",
      "value": "19521"
    },
    "event": "",
    "uuid": "19521_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "245",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "",
    "uuid": "20024_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "250",
    "workorder": {
      "text": "Furniture Installation",
      "value": "87"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "100931",
    "uuid": "20024_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "361",
    "workorder": {
      "text": "Furniture Installation",
      "value": "99"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000740",
      "value": "20024"
    },
    "event": "",
    "uuid": "20024_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "380",
    "workorder": {
      "text": "Desks Installation",
      "value": "20"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000609",
      "value": "11722"
    },
    "event": "",
    "uuid": "11722_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 7,
    "availableQty": 7,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "383",
    "workorder": {
      "text": "Furniture Installation",
      "value": "103"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000769",
      "value": "20898"
    },
    "event": "",
    "uuid": "20898_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "389",
    "workorder": {
      "text": "AV Installation Only",
      "value": "104"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000770",
      "value": "20899"
    },
    "event": "",
    "uuid": "20899_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "390",
    "workorder": {
      "text": "AV Installation Only",
      "value": "104"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000770",
      "value": "20899"
    },
    "event": "",
    "uuid": "20899_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "391",
    "workorder": {
      "text": "AV Installation Only",
      "value": "104"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000770",
      "value": "20899"
    },
    "event": "",
    "uuid": "20899_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "393",
    "workorder": {
      "text": "Furniture Installation",
      "value": "105"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000770",
      "value": "20899"
    },
    "event": "",
    "uuid": "20899_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "409",
    "workorder": {
      "text": "Furniture Installation",
      "value": "108"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000772",
      "value": "20901"
    },
    "event": "",
    "uuid": "20901_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 7,
    "availableQty": 7,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "410",
    "workorder": {
      "text": "Furniture Installation",
      "value": "108"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000772",
      "value": "20901"
    },
    "event": "",
    "uuid": "20901_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "411",
    "workorder": {
      "text": "Furniture Installation",
      "value": "108"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000772",
      "value": "20901"
    },
    "event": "",
    "uuid": "20901_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "412",
    "workorder": {
      "text": "Furniture Installation",
      "value": "108"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000772",
      "value": "20901"
    },
    "event": "",
    "uuid": "20901_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "447",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000777",
      "value": "20906"
    },
    "event": "",
    "uuid": "20906_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "448",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000777",
      "value": "20906"
    },
    "event": "",
    "uuid": "20906_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "449",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000777",
      "value": "20906"
    },
    "event": "",
    "uuid": "20906_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "450",
    "workorder": {
      "text": "Furniture Installation",
      "value": "111"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000777",
      "value": "20906"
    },
    "event": "",
    "uuid": "20906_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "465",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000778",
      "value": "20907"
    },
    "event": "",
    "uuid": "20907_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "466",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000778",
      "value": "20907"
    },
    "event": "",
    "uuid": "20907_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "467",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000778",
      "value": "20907"
    },
    "event": "",
    "uuid": "20907_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "468",
    "workorder": {
      "text": "AV Installation",
      "value": "112"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000778",
      "value": "20907"
    },
    "event": "",
    "uuid": "20907_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "471",
    "workorder": {
      "text": "Furniture Delivery",
      "value": "113"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000779",
      "value": "20908"
    },
    "event": "",
    "uuid": "20908_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "472",
    "workorder": {
      "text": "Furniture Delivery",
      "value": "113"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000779",
      "value": "20908"
    },
    "event": "",
    "uuid": "20908_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "473",
    "workorder": {
      "text": "Furniture Delivery",
      "value": "113"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000779",
      "value": "20908"
    },
    "event": "",
    "uuid": "20908_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "474",
    "workorder": {
      "text": "Furniture Delivery",
      "value": "113"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000779",
      "value": "20908"
    },
    "event": "",
    "uuid": "20908_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 4,
    "availableQty": 4,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "481",
    "workorder": {
      "text": "Lobby Room",
      "value": "114"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000780",
      "value": "20910"
    },
    "event": "",
    "uuid": "20910_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "482",
    "workorder": {
      "text": "Lobby Room",
      "value": "114"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000780",
      "value": "20910"
    },
    "event": "",
    "uuid": "20910_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "483",
    "workorder": {
      "text": "Lobby Room",
      "value": "114"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000780",
      "value": "20910"
    },
    "event": "",
    "uuid": "20910_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 4,
    "availableQty": 4,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "484",
    "workorder": {
      "text": "Lobby Room",
      "value": "114"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000780",
      "value": "20910"
    },
    "event": "",
    "uuid": "20910_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "485",
    "workorder": {
      "text": "Lobby Room",
      "value": "114"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000780",
      "value": "20910"
    },
    "event": "101048",
    "uuid": "20910_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 2,
    "availableQty": 2,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "486",
    "workorder": {
      "text": "Lobby Room",
      "value": "114"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000780",
      "value": "20910"
    },
    "event": "101048",
    "uuid": "20910_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "487",
    "workorder": {
      "text": "Lobby Room",
      "value": "114"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000780",
      "value": "20910"
    },
    "event": "101048",
    "uuid": "20910_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "488",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000781",
      "value": "20911"
    },
    "event": "",
    "uuid": "20911_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "489",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000781",
      "value": "20911"
    },
    "event": "",
    "uuid": "20911_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "490",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000781",
      "value": "20911"
    },
    "event": "",
    "uuid": "20911_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "491",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000781",
      "value": "20911"
    },
    "event": "",
    "uuid": "20911_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "496",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000781",
      "value": "20911"
    },
    "event": "101050",
    "uuid": "20911_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "497",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000781",
      "value": "20911"
    },
    "event": "101050",
    "uuid": "20911_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "498",
    "workorder": {
      "text": "Furniture Installation",
      "value": "115"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000781",
      "value": "20911"
    },
    "event": "101050",
    "uuid": "20911_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "510",
    "workorder": {
      "text": "Furniture Installation",
      "value": "117"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000783",
      "value": "20915"
    },
    "event": "",
    "uuid": "20915_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "511",
    "workorder": {
      "text": "Furniture Installation",
      "value": "117"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000783",
      "value": "20915"
    },
    "event": "",
    "uuid": "20915_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "514",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000786",
      "value": "20919"
    },
    "event": "",
    "uuid": "20919_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "515",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000786",
      "value": "20919"
    },
    "event": "",
    "uuid": "20919_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "516",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000786",
      "value": "20919"
    },
    "event": "",
    "uuid": "20919_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "517",
    "workorder": {
      "text": "AV Installation",
      "value": "118"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000786",
      "value": "20919"
    },
    "event": "",
    "uuid": "20919_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "518",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "",
    "uuid": "20917_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "519",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "",
    "uuid": "20917_2",
    "line": "2",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Diana Chair",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "520",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "",
    "uuid": "20917_3",
    "line": "3",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Working Table",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "521",
    "workorder": {
      "text": "Furniture Installation",
      "value": "119"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "",
    "uuid": "20917_4",
    "line": "4",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Technology Table",
    "quantity": 5,
    "availableQty": 5,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "526",
    "workorder": {
      "text": "Installation of Furnitures",
      "value": "120"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000785",
      "value": "20917"
    },
    "event": "",
    "uuid": "20917_1",
    "line": "1",
    "item": {
      "text": "BIC00008",
      "value": "467"
    },
    "description": "Head Master Chair",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 56,
    "completedQty": 0
  },
  {
    "id": "661",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000837",
      "value": "24432"
    },
    "event": "",
    "uuid": "24432_6",
    "line": "6",
    "item": {
      "text": "J2HB-5124-SS1RS1",
      "value": "2036"
    },
    "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "504",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000782",
      "value": "20914"
    },
    "event": "",
    "uuid": "20914_7",
    "line": "7",
    "item": {
      "text": "J2HB-5124-SS1RS1",
      "value": "2036"
    },
    "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "648",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "101132",
    "uuid": "24427_6",
    "line": "6",
    "item": {
      "text": "J2HB-5124-SS1RS1",
      "value": "2036"
    },
    "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 3
  },
  {
    "id": "441",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "",
    "uuid": "20905_7",
    "line": "7",
    "item": {
      "text": "J2HB-5124-SS1RS1",
      "value": "2036"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "427",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "",
    "uuid": "20903_7",
    "line": "7",
    "item": {
      "text": "J2HB-5124-SS1RS1",
      "value": "2036"
    },
    "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "647",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_6",
    "line": "6",
    "item": {
      "text": "J2HB-5124-SS1RS1",
      "value": "2036"
    },
    "description": "X Series PST,HngdDr,51.5Hx24Wx24D,B/B/F,Valet,RH,PtdDwr,Ptd/StlDr,Ellipse Pull,Reg Top,Glide",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "505",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000782",
      "value": "20914"
    },
    "event": "",
    "uuid": "20914_8",
    "line": "8",
    "item": {
      "text": "JCTB-24S1",
      "value": "2037"
    },
    "description": "X Series,Pedestal,Cushion Top Kit, 24\"​【61 cm】D",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "442",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "",
    "uuid": "20905_8",
    "line": "8",
    "item": {
      "text": "JCTB-24S1",
      "value": "2037"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "428",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "",
    "uuid": "20903_8",
    "line": "8",
    "item": {
      "text": "JCTB-24S1",
      "value": "2037"
    },
    "description": "X Series,Pedestal,Cushion Top Kit, 24\"​【61 cm】D",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "677",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000848",
      "value": "25472"
    },
    "event": "101140",
    "uuid": "",
    "line": "7",
    "item": {
      "text": "JCTB-24S1",
      "value": "2037"
    },
    "description": "X Series,Pedestal,Cushion Top Kit, 24\"D",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "668",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000848",
      "value": "25472"
    },
    "event": "",
    "uuid": "",
    "line": "7",
    "item": {
      "text": "JCTB-24S1",
      "value": "2037"
    },
    "description": "X Series,Pedestal,Cushion Top Kit, 24\"D",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "678",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000848",
      "value": "25472"
    },
    "event": "101140",
    "uuid": "",
    "line": "8",
    "item": {
      "text": "JPMA-24-S1CS1",
      "value": "2038"
    },
    "description": "X Series,Pedestal,Mobile,B/F,24\"D,PtdDrwFrt, Stl Lkrl,Ellipse Pull,Cstr,No Top",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "669",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000848",
      "value": "25472"
    },
    "event": "",
    "uuid": "",
    "line": "8",
    "item": {
      "text": "JPMA-24-S1CS1",
      "value": "2038"
    },
    "description": "X Series,Pedestal,Mobile,B/F,24\"D,PtdDrwFrt, Stl Lkrl,Ellipse Pull,Cstr,No Top",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "429",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "",
    "uuid": "20903_9",
    "line": "9",
    "item": {
      "text": "JPMA-24-S1CS1",
      "value": "2038"
    },
    "description": "X Series,Pedestal,Mobile,B/F,24\"​【6 mm】D,PtdDrwFrt, Stl Lkrl,Ellipse Pull,Cstr,No Top",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "443",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "",
    "uuid": "20905_9",
    "line": "9",
    "item": {
      "text": "JPMA-24-S1CS1",
      "value": "2038"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "506",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000782",
      "value": "20914"
    },
    "event": "",
    "uuid": "20914_9",
    "line": "9",
    "item": {
      "text": "JPMA-24-S1CS1",
      "value": "2038"
    },
    "description": "X Series,Pedestal,Mobile,B/F,24\"​【6 mm】D,PtdDrwFrt, Stl Lkrl,Ellipse Pull,Cstr,No Top",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 12,
    "completedQty": 0
  },
  {
    "id": "305",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000713",
      "value": "19372"
    },
    "event": "100960",
    "uuid": "19372_1",
    "line": "1",
    "item": {
      "text": "LOT00001",
      "value": "677"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 626,
    "completedQty": 0
  },
  {
    "id": "373",
    "workorder": {
      "text": "Furniture Installation and Pickup",
      "value": "101"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000713",
      "value": "19372"
    },
    "event": "",
    "uuid": "19372_1",
    "line": "1",
    "item": {
      "text": "LOT00001",
      "value": "677"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 626,
    "completedQty": 0
  },
  {
    "id": "375",
    "workorder": {
      "text": "Furniture Installation and Pickup - Mei",
      "value": "102"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000768",
      "value": "20897"
    },
    "event": "",
    "uuid": "20897_1",
    "line": "1",
    "item": {
      "text": "LOT00001",
      "value": "677"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 626,
    "completedQty": 0
  },
  {
    "id": "374",
    "workorder": {
      "text": "Furniture Installation and Pickup",
      "value": "101"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000713",
      "value": "19372"
    },
    "event": "",
    "uuid": "19372_2",
    "line": "2",
    "item": {
      "text": "LOT00002",
      "value": "678"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 726,
    "completedQty": 0
  },
  {
    "id": "376",
    "workorder": {
      "text": "Furniture Installation and Pickup - Mei",
      "value": "102"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000768",
      "value": "20897"
    },
    "event": "",
    "uuid": "20897_2",
    "line": "2",
    "item": {
      "text": "LOT00002",
      "value": "678"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 726,
    "completedQty": 0
  },
  {
    "id": "306",
    "workorder": {
      "text": "Furniture Installation",
      "value": "66"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000713",
      "value": "19372"
    },
    "event": "100960",
    "uuid": "19372_2",
    "line": "2",
    "item": {
      "text": "LOT00002",
      "value": "678"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 726,
    "completedQty": 0
  },
  {
    "id": "507",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000782",
      "value": "20914"
    },
    "event": "",
    "uuid": "20914_10",
    "line": "10",
    "item": {
      "text": "TA0M-1396-FPS1",
      "value": "2834"
    },
    "description": "Planes,Modesty Panel, 13InX96In,Fab,Pwr",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "359",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000755",
      "value": "20872"
    },
    "event": "101012",
    "uuid": "20872_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 60,
    "availableQty": 60,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "355",
    "workorder": {
      "text": "Work Order for Testing Nov 5 - 2",
      "value": "97"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000755",
      "value": "20872"
    },
    "event": "",
    "uuid": "20872_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "365",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000766",
      "value": "20892"
    },
    "event": "",
    "uuid": "20892_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 200,
    "availableQty": 200,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "353",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000755",
      "value": "20872"
    },
    "event": "",
    "uuid": "20872_1",
    "line": "1",
    "item": {
      "text": "VZCC-0024-A",
      "value": "1144"
    },
    "description": "",
    "quantity": 60,
    "availableQty": 60,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "670",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000848",
      "value": "25472"
    },
    "event": "",
    "uuid": "",
    "line": "9",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "665",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000848",
      "value": "25472"
    },
    "event": "",
    "uuid": "",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "650",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000836",
      "value": "24428"
    },
    "event": "",
    "uuid": "24428_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "655",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000836",
      "value": "24428"
    },
    "event": "101133",
    "uuid": "24428_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "656",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000837",
      "value": "24432"
    },
    "event": "",
    "uuid": "24432_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "649",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "101132",
    "uuid": "24427_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 1
  },
  {
    "id": "642",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "633",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000826",
      "value": "23471"
    },
    "event": "101123",
    "uuid": "23471_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "631",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000826",
      "value": "23471"
    },
    "event": "101122",
    "uuid": "23471_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "618",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000826",
      "value": "23471"
    },
    "event": "",
    "uuid": "23471_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "537",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000795",
      "value": "22459"
    },
    "event": "",
    "uuid": "22459_1",
    "line": "1",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In​【137 cm】.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "395",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_3",
    "line": "3",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "402",
    "workorder": {
      "text": "Install Cove Lights - Follow Up",
      "value": "107"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_3",
    "line": "3",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "422",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "",
    "uuid": "20903_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In​【137 cm】.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "430",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "",
    "uuid": "20903_10",
    "line": "10",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In​【137 cm】.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "436",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "",
    "uuid": "20905_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "444",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "",
    "uuid": "20905_10",
    "line": "10",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "499",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000782",
      "value": "20914"
    },
    "event": "",
    "uuid": "20914_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1",
      "value": "2031"
    },
    "description": "Compose,Top Trim 54In​【137 cm】.W,Stl, Pnl Frame",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 30,
    "completedQty": 0
  },
  {
    "id": "366",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000766",
      "value": "20892"
    },
    "event": "",
    "uuid": "20892_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 10,
    "availableQty": 10,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "354",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000755",
      "value": "20872"
    },
    "event": "",
    "uuid": "20872_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 7,
    "availableQty": 7,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "360",
    "workorder": {
      "text": "Work Order for Testing Nov 5",
      "value": "96"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000755",
      "value": "20872"
    },
    "event": "101012",
    "uuid": "20872_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 7,
    "availableQty": 7,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "356",
    "workorder": {
      "text": "Work Order for Testing Nov 5 - 2",
      "value": "97"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000755",
      "value": "20872"
    },
    "event": "",
    "uuid": "20872_2",
    "line": "2",
    "item": {
      "text": "VZCC-0054-HSS1_NEW2",
      "value": "2935"
    },
    "description": "",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "508",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000782",
      "value": "20914"
    },
    "event": "",
    "uuid": "20914_11",
    "line": "11",
    "item": {
      "text": "VZCC-0060-HSS1",
      "value": "2835"
    },
    "description": "Compose,Top Trim 60In​【152 cm】.W,Stl, Pnl Frame",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "368",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000766",
      "value": "20892"
    },
    "event": "",
    "uuid": "20892_4",
    "line": "4",
    "item": {
      "text": "VZCC-0072-W",
      "value": "1069"
    },
    "description": "",
    "quantity": 20,
    "availableQty": 20,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "367",
    "workorder": {
      "text": "Work Order Dry Run - Nov 8",
      "value": "100"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000766",
      "value": "20892"
    },
    "event": "",
    "uuid": "20892_3",
    "line": "3",
    "item": {
      "text": "VZCC-0096-A",
      "value": "1148"
    },
    "description": "",
    "quantity": 1,
    "availableQty": 1,
    "note": "",
    "quantityReceived": 0,
    "completedQty": 0
  },
  {
    "id": "657",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000837",
      "value": "24432"
    },
    "event": "",
    "uuid": "24432_2",
    "line": "2",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "666",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000848",
      "value": "25472"
    },
    "event": "",
    "uuid": "",
    "line": "2",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "675",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000836",
      "value": "24428"
    },
    "event": "101150",
    "uuid": "24428_2",
    "line": "2",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "396",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_4",
    "line": "4",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "403",
    "workorder": {
      "text": "Install Cove Lights - Follow Up",
      "value": "107"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_4",
    "line": "4",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "423",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "",
    "uuid": "20903_3",
    "line": "3",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "Compose,Panel Trim,End-Of-Run 74In​【188 cm】.H, Steel",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "431",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "",
    "uuid": "20903_11",
    "line": "11",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "Compose,Panel Trim,End-Of-Run 74In​【188 cm】.H, Steel",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "437",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "",
    "uuid": "20905_3",
    "line": "3",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "445",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "",
    "uuid": "20905_11",
    "line": "11",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "500",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000782",
      "value": "20914"
    },
    "event": "",
    "uuid": "20914_3",
    "line": "3",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "Compose,Panel Trim,End-Of-Run 74In​【188 cm】.H, Steel",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "643",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_2",
    "line": "2",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "651",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000836",
      "value": "24428"
    },
    "event": "",
    "uuid": "24428_2",
    "line": "2",
    "item": {
      "text": "VZCE-7400-HS1",
      "value": "2032"
    },
    "description": "Compose,Panel Trim,End-Of-Run 74In.H, Steel",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 90,
    "completedQty": 0
  },
  {
    "id": "667",
    "workorder": {
      "text": "HVAC Maintenance",
      "value": "141"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000848",
      "value": "25472"
    },
    "event": "",
    "uuid": "",
    "line": "3",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "Compose,Wall Mount,Fits All Heights",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "438",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "",
    "uuid": "20905_4",
    "line": "4",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "501",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000782",
      "value": "20914"
    },
    "event": "",
    "uuid": "20914_4",
    "line": "4",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "Compose,Wall Mount,Fits All Heights",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "539",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000795",
      "value": "22459"
    },
    "event": "",
    "uuid": "22459_3",
    "line": "3",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "Compose,Wall Mount,Fits All Heights",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "397",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_5",
    "line": "5",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "644",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_3",
    "line": "3",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "Compose,Wall Mount,Fits All Heights",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "632",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000826",
      "value": "23471"
    },
    "event": "101122",
    "uuid": "23471_3",
    "line": "3",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "Compose,Wall Mount,Fits All Heights",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "404",
    "workorder": {
      "text": "Install Cove Lights - Follow Up",
      "value": "107"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_5",
    "line": "5",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "652",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000836",
      "value": "24428"
    },
    "event": "",
    "uuid": "24428_3",
    "line": "3",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "Compose,Wall Mount,Fits All Heights",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "619",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000826",
      "value": "23471"
    },
    "event": "",
    "uuid": "23471_3",
    "line": "3",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "Compose,Wall Mount,Fits All Heights",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "424",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "",
    "uuid": "20903_4",
    "line": "4",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "Compose,Wall Mount,Fits All Heights",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "658",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000837",
      "value": "24432"
    },
    "event": "",
    "uuid": "24432_3",
    "line": "3",
    "item": {
      "text": "VZCW-0000-PS1S1",
      "value": "2033"
    },
    "description": "Compose,Wall Mount,Fits All Heights",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 48,
    "completedQty": 0
  },
  {
    "id": "439",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "",
    "uuid": "20905_5",
    "line": "5",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "425",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "",
    "uuid": "20903_5",
    "line": "5",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "Compose,Stack Frame 16In​【41 cm】.H X 54In​【137 cm】.W,Std Accoust,NoPwr",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "405",
    "workorder": {
      "text": "Install Cove Lights - Follow Up",
      "value": "107"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_6",
    "line": "6",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "398",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_6",
    "line": "6",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "659",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000837",
      "value": "24432"
    },
    "event": "",
    "uuid": "24432_4",
    "line": "4",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "653",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000836",
      "value": "24428"
    },
    "event": "",
    "uuid": "24428_4",
    "line": "4",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "645",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_4",
    "line": "4",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "620",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000826",
      "value": "23471"
    },
    "event": "",
    "uuid": "23471_4",
    "line": "4",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "Compose,Stack Frame 16In.H X 54In.W,Std Accoust,NoPwr",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "540",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000795",
      "value": "22459"
    },
    "event": "",
    "uuid": "22459_4",
    "line": "4",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "Compose,Stack Frame 16In​【41 cm】.H X 54In​【137 cm】.W,Std Accoust,NoPwr",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "502",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000782",
      "value": "20914"
    },
    "event": "",
    "uuid": "20914_5",
    "line": "5",
    "item": {
      "text": "VZFS-1654-RS1",
      "value": "2034"
    },
    "description": "Compose,Stack Frame 16In​【41 cm】.H X 54In​【137 cm】.W,Std Accoust,NoPwr",
    "quantity": 6,
    "availableQty": 6,
    "note": "",
    "quantityReceived": 108,
    "completedQty": 0
  },
  {
    "id": "541",
    "workorder": {
      "text": "World Bank_WRKORDR0001",
      "value": "122"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000795",
      "value": "22459"
    },
    "event": "",
    "uuid": "22459_5",
    "line": "5",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "Compose,Single Tile,16In​【41 cm】.HX54In.W,Fabric/Tackable,Std Core,No Tech",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  },
  {
    "id": "406",
    "workorder": {
      "text": "Install Cove Lights - Follow Up",
      "value": "107"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_7",
    "line": "7",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  },
  {
    "id": "646",
    "workorder": {
      "text": "Lobby Area - Product Core Dryrun",
      "value": "138"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000835",
      "value": "24427"
    },
    "event": "",
    "uuid": "24427_5",
    "line": "5",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  },
  {
    "id": "621",
    "workorder": {
      "text": "Android Full Dryrun",
      "value": "137"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000826",
      "value": "23471"
    },
    "event": "",
    "uuid": "23471_5",
    "line": "5",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  },
  {
    "id": "399",
    "workorder": {
      "text": "Install Cove Lights",
      "value": "106"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000771",
      "value": "20900"
    },
    "event": "",
    "uuid": "20900_7",
    "line": "7",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  },
  {
    "id": "440",
    "workorder": {
      "text": "Install AC",
      "value": "110"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000776",
      "value": "20905"
    },
    "event": "",
    "uuid": "20905_6",
    "line": "6",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  },
  {
    "id": "426",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "",
    "uuid": "20903_6",
    "line": "6",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "Compose,Single Tile,16In​【41 cm】.HX54In.W,Fabric/Tackable,Std Core,No Tech",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  },
  {
    "id": "503",
    "workorder": {
      "text": "Window Placement Planning",
      "value": "116"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000782",
      "value": "20914"
    },
    "event": "",
    "uuid": "20914_6",
    "line": "6",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "Compose,Single Tile,16In​【41 cm】.HX54In.W,Fabric/Tackable,Std Core,No Tech",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  },
  {
    "id": "660",
    "workorder": {
      "text": "Product Core Testing - 2",
      "value": "140"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000837",
      "value": "24432"
    },
    "event": "",
    "uuid": "24432_5",
    "line": "5",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  },
  {
    "id": "433",
    "workorder": {
      "text": "Install Office Furniture",
      "value": "109"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000774",
      "value": "20903"
    },
    "event": "101035",
    "uuid": "20903_6",
    "line": "6",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "",
    "quantity": 12,
    "availableQty": 12,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  },
  {
    "id": "654",
    "workorder": {
      "text": "Lobby Area - Product Test",
      "value": "139"
    },
    "salesorder": {
      "text": "Sales Order #SLS00000836",
      "value": "24428"
    },
    "event": "",
    "uuid": "24428_5",
    "line": "5",
    "item": {
      "text": "VZTI-1654-FNNS1",
      "value": "2035"
    },
    "description": "Compose,Single Tile,16In.HX54In.W,Fabric/Tackable,Std Core,No Tech",
    "quantity": 3,
    "availableQty": 3,
    "note": "",
    "quantityReceived": 192,
    "completedQty": 0
  }
];

export const fetchWOItems = async (woId: string, eventId: string): Promise<WOItem[]> => {
  if (isLocalDevelopment()) {
    console.log('Using mock item data for local development');
    return new Promise((resolve) => {
      let loadData = woId ? mockWOItems.filter(x => x.workorder.value == woId) : mockWOItems;
      if (eventId) {
        loadData = loadData.filter(x => x.event == eventId);
      }
      setTimeout(() => resolve(loadData), 500);
    });
  }

  try {
    console.log('WOItem: Starting to fetch work order items');
    
    let allData: WOItem[] = [];
    let i = 0;
    let hasMoreData = true;
    const chunkSize = 500;
    
    while (hasMoreData) {
      const start = 0 + (i * chunkSize);
      const end = chunkSize + (i * chunkSize);
      const url = `${suiteletUrl}&mode=getWorkOrderItems&woId=${woId}&eventId=${eventId}&start=${start}&end=${end}`;
      const response = await fetch(url);
      console.log(`WOItem service RESPONSE chunk ${i + 1}:`, response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch work order items chunk ${i + 1}: ${response.status}`);
      }
      
      const chunkData = await response.json();
      console.log(`WOItem service RESULT chunk ${i + 1}:`, chunkData);
      
      if (!chunkData || chunkData.length === 0) {
        hasMoreData = false;
      } else {
        allData = [...allData, ...chunkData];

        if (chunkData.length < chunkSize) {
          hasMoreData = false;
        }
      }
      
      i++;
    }
    
    console.log(`Finished chunked fetch. Total work order item records collected: ${allData.length}`);
    
    if (allData.length === 0) {
      console.error("API returned no work order item data across all chunks");
      throw new Error("No work order item data returned from API");
    }

    return allData;

  } catch (error) {
    console.error('WOItem: Error fetching work order items:', error);
    throw error;
  }
};
