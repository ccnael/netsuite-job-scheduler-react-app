/**
 * @NApiVersion 2.1
 * @NModuleScope Public
 */
define([],

  () => {

    const resources = () => {
      return {
        all: [
          {
            id: '1',
            initials: 'JM',
            employee: {
              text: 'Jay Maynard',
              value: '1'
            },
            email: 'jaymaynard@yahoo.com',
            phone: '+0024112398481',
            location: {
              text: 'Boston',
              value: '2'
            },
            active: true,
            resourceGroup: {
              text: 'Group X: JM & TX',
              value: '1'
            },
            color: `#c864c3`
          },
          {
            id: '2',
            initials: 'TX',
            employee: {
              text: 'Test XYZ',
              value: '2'
            },
            email: 'testxyz@yahoo.com',
            phone: '+0024112398481',
            location: {
              text: 'Boston',
              value: '1'
            },
            active: true,
            resourceGroup: {
              text: 'Group X: JM & TX',
              value: '1'
            },
            color: `#8eff27`
          },
          {
            id: '3',
            initials: 'PJ',
            employee: {
              text: 'Phil Jackson',
              value: '3'
            },
            email: 'philjackson@yahoo.com',
            phone: '+0024112398481',
            location: {
              text: 'Los Angeles',
              value: '2'
            },
            active: true,
            resourceGroup: {
              text: 'Group Y: PJ Team',
              value: '2'
            },
            color: `#6ab8f3`
          },
          {
            id: '4',
            initials: 'IU',
            employee: {
              text: 'Inactive User',
              value: '4'
            },
            email: 'inactiveuser@yahoo.com',
            phone: '+0024112398481',
            location: {
              text: 'Los Angeles',
              value: '2'
            },
            active: false,
            resourceGroup: {
              text: '',
              value: ''
            },
            color: `#d7ab17`
          }
        ],
        get active() {
          return this.all.filter((resource) => Boolean(resource.active));
        } 
      }
    }

    const workOrders = () => {
      return [
        {
          id: '1',
          name: 'WO#1',
          title: 'SAMPLE WORK ORDER 1',
          project: {
            text: 'TEST Project 1',
            value: '1',
          },
          date: '07/01/2024',
          status: {
            text: 'In Progress',
            value: '1'
          },
          type: {
            text: 'TBD',
            value: 'TBD'
          },
          location: {
            text: 'Boston',
            value: '1'
          },
          locationaddr: ``,
          memo: 'Sample Data',
          salesorder: {
            text: '',
            value: ''
          },
          customer: {
            text: 'Test Customer',
            value: '1',
          },
          resourceGroup: {
            text: '',
            value: '1',
          },
          priority: '',
          resources: [],
          items: [],
          addresses: [],
          contacts: [],
          events: [],
          get projectUrl() {
            return Url.project(this.project.value)
          },
          get woUrl() {
            return Url.workOrder(this.id)
          }
        },
        {
          id: '1',
          name: 'WO#1',
          title: 'SAMPLE WORK ORDER 1',
          project: {
            text: 'TEST Project 1',
            value: '1',
          },
          date: '07/01/2024',
          status: {
            text: 'In Progress',
            value: '1'
          },
          type: {
            text: 'TBD',
            value: 'TBD'
          },
          location: {
            text: 'Boston',
            value: '1'
          },
          locationaddr: ``,
          memo: 'Sample Data',
          salesorder: {
            text: '',
            value: ''
          },
          customer: {
            text: 'Test Customer',
            value: '1',
          },
          resourceGroup: {
            text: '',
            value: '1',
          },
          priority: '',
          resources: [],
          items: [],
          addresses: [],
          contacts: [],
          events: [],
          get projectUrl() {
            return Url.project(this.project.value)
          },
          get woUrl() {
            return Url.workOrder(this.id)
          }
        }
      ]
    }

    const resourceColorCode = () => {
      return {
        '1767': '#554de2',
        '912': '#cbb24c',
        '1312': '#bc3567',
        '1292': '#e57d29',
        '1647': '#f1484c',
        '1766': '#7d5f3c'
      }
    }

    return {
      resources,
      workOrders,
      resourceColorCode
    }

  });