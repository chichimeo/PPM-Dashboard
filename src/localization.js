export default {
  locale: 'vi',
  messages: {
    vi: {
      teible: {
        showing: 'Hiển thị',
        total: 'trên tổng số {count} bản ghi',
        last: 'bản ghi cuối cùng',
        empty: 'Không có dữ liệu',
        filter: 'Lọc các bản ghi'
      },
      route: {
        overview: 'Tổng Quan',
        threat: 'Mối Đe Dọa',
        agent: 'Máy Trạm',
        management: 'Quản Trị',
        policy: 'Chính Sách',
        report: 'Báo Cáo',
        alert: 'Cảnh Báo',
        schedule: 'Đặt Lịch',
        config: 'Cài Đặt',
        info: 'Thông tin',
        collector: 'SIEM',
        group: 'Nhóm Máy Trạm',
        license: 'Bản Quyền',
        user: 'Người Dùng',
        update: 'Cập Nhật'
      },
      global: {
        detail: 'Chi Tiết',
        action: 'Hành Động',
        edit: 'Chỉnh Sửa',
        update: 'Cập Nhật',
        delete: 'Xóa',
        submit: 'Xác Nhận',
        close: 'Đóng',
        add: 'Thêm',
        send: 'Gửi',
        cancel: 'Hủy Bỏ',
        download: 'Tải Về',
        all: 'Tất cả'
      },
      components: {
        login: {
          downloadCyEDR: 'Tải về CyEDR'
        },
        overview: {
          protectedUsers: 'Máy Trạm Được Bảo Vệ',
          detectedThreats: 'Mối Nguy Hại Được Phát Hiện Và Xử Lý',
          highPriorityThreats: 'Mối Đe Dọa Cao Đã Xử Lý',
          criticalThreats: 'Mối Đe Dọa Nghiêm Trọng Đã Xử Lý',
          recentThreatEvents: 'Mối Đe Dọa Gần Đây',
          topInfectedClients: 'Máy Trạm Bị Nhiễm Nhiều Nhất',
          topInfectedGroups: 'Nhóm Máy Trạm Bị Nhiễm Nhiều Nhất',
          category: 'Phân Loại',
          clients: 'Máy Trạm',
          groups: 'Nhóm'
        },
        threats: {
          lowPriorityThreats: 'Mối Đe Dọa Thấp Đã Xử Lý',
          mediumPriorityThreats: 'Mối Đe Dọa Trung Bình Đã Xử Lý',
          highPriorityThreats: 'Mối Đe Dọa Cao Đã Xử Lý',
          criticalThreats: 'Mối Đe Dọa Nghiêm Trọng Đã Xử Lý',
          threatEvents: 'Mối Đe Dọa',
          group: 'Nhóm',
          processName: 'Tên Tiến Trình',
          priority: 'Mức Độ',
          category: 'Phân Loại',
          time: 'Thời Gian',
          user: 'Người Dùng',
          computerName: 'Tên Máy',
          action: 'Hành Động',
          sample: 'Mẫu',
          activityDetail: 'Thông Tin Chi Tiết',
          processTree: 'Cây Tiến Trình',
          processInfo: 'Thông tin Tiến Trình',
          name: 'Tên',
          path: 'Đường Dẫn',
          pid: 'PID',
          parentPID: 'PPID'
        },
        agents: {
          agents: 'Máy Trạm',
          agentDetail: 'Thông Tin Máy Trạm',
          group: 'Nhóm',
          command: 'Lệnh',
          commandType: 'Loại Lệnh',
          path: 'Đường Dẫn',
          pendingCommands: 'Lệnh Đang Chờ',
          payload: 'Gói Tin',
          time: 'Thời Gian',
          computerName: 'Tên Máy Trạm',
          removed: 'Đã Gỡ Bỏ',
          ip: 'IP',
          operatingSystem: 'Hệ Điều Hành',
          agentVersion: 'Phiên Bản',
          vulnerabilities: 'Lỗ Hổng',
          installTime: 'Thời Gian Cài Đặt',
          lastConnection: 'Kêt Nối Lần Cuối',
          localIP: 'IP Nội Bộ',
          action: 'Hành Động',
          agentIP: 'IP Máy Trạm',
          mac: 'Mac',
          macNetwork: 'Mac Network',
          lastUpdate: 'Cập Nhật Lần Cuối',
          userName: 'Tên Tài Khoản',
          enableFirewall: 'Kích Hoạt Tường Lửa',
          autoProtect: 'Bảo Vệ Tự Động'
        },
        policies: {
          add: 'Thêm',
          policies: 'Chính Sách',
          whitelist: 'Cho Phép',
          blacklist: 'Ngăn Chặn',
          restriction: 'Hạn Chế Gỡ Bỏ',
          blacklistHelp: 'Ngăn chặn máy trạm thực hiện kết nối đến các địa chỉ cụ thể',
          restrictionHelp: 'Giới hạn người dùng khỏi 1 vài chức năng (vd. gỡ cài đặt).<br>Sử dụng mật khẩu được cung cấp bởi người quản trị để mở khóa.',
          unknownPC: 'Unknown PC',
          name: 'Tên',
          type: 'Loại',
          computerName: 'Tên Máy Trạm',
          audience: 'Đối Tượng',
          action: 'Hành Động',
          description: 'Mô Tả',
          policyType: 'Loại Chính Sách',
          groups: 'Nhóm',
          agents: 'Máy Trạm',
          general: 'Chung',
          specific: 'Cụ Thể',
          everyone: 'Tất Cả',
          accessControlList: 'Danh Sách Điều Khiển',
          ip: 'IP',
          port: 'Cổng',
          password: 'Mật Khẩu',
          newPolicy: 'Thêm Chính Sách',
          updatePolicy: 'Cập Nhật Chính Sách'
        },
        report: {
          reportExport: 'Xuất Báo Cáo',
          group: 'Nhóm',
          timeRange: 'Khoảng Thời Gian',
          reportType: 'Loại Báo Cáo',
          users: 'Người Dùng',
          maliciousHosts: 'Địa Chỉ Độc Hại',
          priorities: 'Mức độ',
          categories: 'Phân Loại',
          preview: 'Xem Trước',
          download: 'Tải Về',
          confirmation: 'Xác Nhận',
          organizationID: 'ID Tổ Chức',
          organizationName: 'Tên Tổ Chức',
          organizationAddress: 'Địa Chỉ Tổ Chức',
          email: 'Email',
          telephone: 'Điện Thoại',
          fax: 'Fax',
          website: 'Website',
          reportEndpoint: 'Địa Chỉ Gửi Báo Cáo',
          confirmSubmit: 'Xác Nhận & Gửi',
          pdfReport: 'Báo Cáo Dạng PDF',
          noSupportPDF: 'Trình duyệt không hỗ  trợ hiển thị PDF. Mời tải file PDF về để xem',
          downloadPDF: 'Tải về PDF',
          xmlReport: 'Báo Cáo Dạng XML',
          copyToClipboard: 'Sao Chép',
          schedulesReport: 'Đặt Lịch Báo Cáo',
          waiting: 'Đang Chờ',
          failed: 'Lỗi',
          done: 'Xong',
          newScheduleTask: 'Đặt Lịch Mới',
          updateMailReportTask: 'Cập Nhật Tác Vụ: Định Kỳ Gửi Báo Cáo Qua Mail',
          updateXMLReportTask: 'Cập Nhật Tác Vụ: Định Kỳ Gửi Báo Cáo XML',
          task: 'Tác Vụ',
          status: 'Trạng Thái',
          nextExecutation: 'Lần Chạy Tới',
          repeating: 'Lặp Lại',
          endding: 'Thời Gian Kết Thúc',
          action: 'Hành Động'
        },
        schedule: {
          schedules: 'Đặt Lịch',
          waiting: 'Đang Chờ',
          failed: 'Lỗi',
          done: 'Xong',
          newScheduleTask: 'Đặt Lịch Mới',
          updateMailReportTask: 'Cập Nhật Tác Vụ: Định Kỳ Gửi Báo Cáo Qua Mail',
          updateThreatNotifyTask: 'Cập Nhật Tác Vụ: Cảnh Báo Tức Thì',
          updateXMLReportTask: 'Cập Nhật Tác Vụ: Định Kỳ Gửi Báo Cáo XML',
          task: 'Tác Vụ',
          status: 'Trạng Thái',
          nextExecutation: 'Lần Chạy Tới',
          repeating: 'Lặp Lại',
          endding: 'Thời Gian Kết Thúc',
          action: 'Hành Động'
        },
        configuration: {
          organizationInfo: 'Thông Tin Đơn Vị',
          agentsGroup: 'Nhóm Máy Trạm',
          license: 'Bản Quyền',
          dashboardUser: 'Người Dùng Quản Trị',
          offlineUpdate: 'Cập Nhật Ngoại Tuyến'
        },
        configurationInfo: {
          info: 'Thông tin',
          group: 'Nhóm',
          organizationInfo: 'Thông Tin Tổ Chức',
          endpoint: 'Địa Chỉ Nhận',
          organizationID: 'ID Tổ Chức',
          organizationName: 'Tên Tổ Chức',
          organizationAddress: 'Địa Chỉ Tổ Chức',
          email: 'Email',
          telephone: 'Điện Thoại',
          fax: 'Fax',
          website: 'Website',
          reportEndpoint: 'Địa Chỉ Gửi Báo Cáo'
        },
        configurationGroup: {
          groups: 'Nhóm Máy Trạm',
          name: 'Tên',
          groupKey: 'Mã Nhóm',
          licenseKey: 'Mã Bản Quyền',
          createLicense: 'Tạo mã bản quyền mới cho nhóm',
          netmask: 'Mặt Nạ Mạng',
          subnets: 'Mạng Con',
          agents: 'Máy Trạm',
          description: 'Mô Tả',
          groupName: 'Tên Nhóm',
          childGroups: 'Nhóm Con',
          count: 'Số Lượng',
          agentCount: 'Số Lượng Máy',
          action: 'Hành Động',
          createNewGroup: 'Thêm Nhóm Mới',
          editGroup: 'Cập Nhật Thông Tin Nhóm'
        },
        configurationLicense: {
          licenses: 'Bản Quyền',
          random: 'Ngẫu Nhiên',
          licenseKey: 'Mã Bản Quyền',
          agentGroups: 'Nhóm Máy Trạm',
          limit: 'Giới Hạn',
          countLimit: 'Số Lượng/Giới Hạn',
          limited: 'Có Giới Hạn',
          unlimited: 'Không Giới Hạn',
          agents: 'Máy Trạm'
        },
        user: {
          dashboardUsers: 'Người Dùng',
          userName: 'Tên Tài Khoản',
          name: 'Tên',
          type: 'Loại',
          group: 'Nhóm',
          oldPassword: 'Mật Khẩu Cũ',
          password: 'Mật Khẩu',
          confirmPassword: 'Xác Nhận Mật Khẩu',
          action: 'Hành Động',
          createNewUser: 'Thêm Người dùng mới',
          updateUser: 'Cập Nhật Thông Tin Người Dùng'
        },
        configurationUpdate: {
          agent: 'Phần Mềm',
          database: 'Cơ Sở Dữ Liệu',
          offlineUpdate: 'Cập Nhật Ngoại Tuyến',
          agentUpdateFile: 'Cập Nhật Phần Mềm',
          dashboardUpdateFile: 'Cập Nhật Cơ Sở Dữ Liệu',
          chooseAFile: 'Lựa chọn file...',
          noFileChosen: 'Chưa có file được chọn'
        },
        formSchedule: {
          nextExecution: 'Lần Chạy Tới',
          repeatUnit: 'Đơn vị lặp lại',
          repeatInterval: 'Khoảng Lặp',
          ends: 'Kết Thúc',
          never: 'Không Bao Giờ',
          occurrences: 'Giới Hạn Số Lần',
          mailReport: 'Báo Cáo Qua Mail',
          threatNotify: 'Thông Báo Tức Thì',
          xmlReport: 'Báo Cáo Dạng XML',
          minutes: 'Phút',
          hours: 'Giờ',
          days: 'Ngày',
          weeks: 'Tuần',
          months: 'Tháng'
        },
        formScheduleThreatNotidy: {
          types: 'Loại',
          priorities: 'Mức độ'
        },
        formScheduleXmlReport: {
          types: 'Loại',
          priorities: 'Mức độ',
          group: 'Nhóm'
        },
        download: {
          instructions: 'Hướng Dẫn',
          howTo: 'Hướng dẫn cài đặt CyRadar Endpoint Detection & Response',
          step: 'Bước',
          download: 'Tải về',
          installer: 'bộ cài CyRadar EDR',
          doubleClick: 'Nhấp đúp vào tập tin vừa tải về, bộ cài sẽ được khởi động.',
          fillInfo: 'Điền vào các thông tin cần thiết',
          serverAddress: 'Địa chỉ server',
          serverAddressExplain: 'địa chỉ IP của máy chủ CyRadar đặt tại khách hàng. Nếu không có hướng dẫn cụ thể của quản trị viên, người dùng có thể điền',
          port: 'Cổng kết nối',
          portExplain: 'cổng kết nối của máy chủ CyRadar. Nếu không có hướng dẫn cụ thể của quản trị viên, người dùng có thể điền',
          license: 'Mã bản quyền',
          licenseExplain: 'mã bản quyền dùng để xác minh và phân loại các máy trạm. Liên hệ quản trị viên để có thông tin này.',
          contact: 'Thông tin liên hệ',
          contactExplain: '(tùy chọn) Thông tin liên hệ của người dùng.',
          pressInstall: 'Nhấn nút <strong>Cài đặt</strong>.',
          beginToInstall: 'Bộ cài sẽ tự động tải về các tập tin cần thiết và bắt đầu quá trình cài đặt CyRadar EDR trên máy trạm.',
          restartToComplete: 'Khởi động lại máy tính để hoàn tất quá trình cài đặt.'
        },
        alert: {
          alerts: 'Cảnh Báo',
          recipients: 'Người Nhận',
          status: 'Trạng Thái',
          waiting: 'Đang Chờ',
          failed: 'Lỗi',
          done: 'Xong',
          nextExecutation: 'Lần Chạy Tới',
          action: 'Hành Động',
          newThreatNotifyTask: 'Thêm Tác Vụ: Cảnh Báo Tức Thì',
          updateThreatNotifyTask: 'Cập Nhật Tác Vụ: Cảnh Báo Tức Thì'
        },
        collector: {
          siem: 'SIEM',
          type: 'Loại',
          endpoint: 'Địa chỉ',
          create: 'Thêm',
          updateSIEM: 'Sửa SIEM',
          header: 'Header',
          endpointIsEmpty: 'Hãy nhập địa chỉ',
          endpointIsInvalid: 'Địa chỉ không hợp lệ',
          headerIsEmpty: 'Hãy nhập header',
          headerIsDuplicate: 'Header đã tồn tại',
          sendEvents: 'Gửi Events',
          send: 'Gửi',
          timeRange: 'Khoảng Thời Gian'
        }
      }
    },
    en: {
      teible: {
        showing: 'Showing',
        total: 'of {count} records',
        last: 'the last record',
        empty: 'No records',
        filter: 'Filter records'
      },
      route: {
        overview: 'Overview',
        threat: 'Threat',
        agent: 'Agent',
        management: 'Management',
        policy: 'Policy',
        report: 'Report',
        schedule: 'Schedule',
        config: 'Config',
        collector: 'SIEM',
        info: 'Info',
        group: 'Group',
        license: 'License',
        user: 'User',
        update: 'Offline Update'
      },
      global: {
        detail: 'Detail',
        action: 'Action',
        edit: 'Edit',
        update: 'Update',
        delete: 'Delete',
        submit: 'Submit',
        close: 'Close',
        add: 'Add',
        send: 'Send',
        cancel: 'Cancel',
        download: 'Download',
        all: 'All'
      },
      components: {
        login: {
          downloadCyEDR: 'Download CyEDR'
        },
        overview: {
          protectedUsers: 'Protected Users',
          detectedThreats: 'Detected & Isolated Threats',
          highPriorityThreats: 'High Priority Threats',
          criticalThreats: 'Critical Threats',
          recentThreatEvents: 'Recent Threat Events',
          topInfectedClients: 'Top Infected Clients',
          topInfectedGroups: 'Top Infected Groups',
          category: 'Category',
          clients: 'Clients',
          groups: 'Groups'
        },
        threats: {
          lowPriorityThreats: 'Low Priority Threats',
          mediumPriorityThreats: 'Medium Priority Threats',
          highPriorityThreats: 'High Priority Threats',
          criticalThreats: 'Critical Threats',
          threatEvents: 'Threat Events',
          group: 'Group',
          processName: 'Process Name',
          priority: 'Priority',
          category: 'Category',
          time: 'Time',
          user: 'User',
          computerName: 'Computer Name',
          action: 'Action',
          sample: 'Sample',
          activityDetail: 'Activity Detail',
          processTree: 'Process Tree',
          processInfo: 'Process Info',
          name: 'Name',
          path: 'Path',
          pid: 'PID',
          parentPID: 'Parent PID'
        },
        agents: {
          agents: 'Agents',
          agentDetail: 'Agent Detail',
          group: 'Group',
          command: 'Command',
          commandType: 'Command Type',
          path: 'Path',
          pendingCommands: 'Pending Commands',
          payload: 'Payload',
          time: 'Time',
          computerName: 'Computer Name',
          ip: 'IP',
          operatingSystem: 'Operating System',
          agentVersion: 'Agent Version',
          vulnerabilities: 'Vulnerabilities',
          installTime: 'Install Time',
          lastConnection: 'Last Connection',
          localIP: 'Local IP',
          action: 'Action',
          removed: 'Removed',
          agentIP: 'Agent IP',
          mac: 'Mac',
          macNetwork: 'Mac Network',
          lastUpdate: 'Last Update',
          userName: 'Username',
          enableFirewall: 'Enable Firewall',
          autoProtect: 'Auto Protect'
        },
        policies: {
          add: 'Add',
          policies: 'Policies',
          whitelist: 'Whitelist',
          blacklist: 'Blacklist',
          restriction: 'Password-Protected Uninstallation',
          blacklistHelp: 'Block client from connecting to specific destination.',
          restrictionHelp: 'Restrict user from doing certain actions (e.g. uninstall).<br>Use password provided by admin to unlock.',
          unknownPC: 'Unknown PC',
          name: 'Name',
          type: 'Type',
          computerName: 'Computer Name',
          audience: 'Audience',
          action: 'Action',
          description: 'Description',
          policyType: 'Policy Type',
          groups: 'Groups',
          agents: 'Agents',
          general: 'General',
          specific: 'Specific',
          everyone: 'Everyone',
          accessControlList: 'Access Control List',
          ip: 'IP',
          port: 'Port',
          password: 'Password',
          newPolicy: 'New Policy',
          updatePolicy: 'Update Policy'
        },
        report: {
          reportExport: 'Report Export',
          group: 'Group',
          timeRange: 'Time Range',
          reportType: 'Report Type',
          users: 'Users',
          maliciousHosts: 'Malicious Hosts',
          priorities: 'Priorities',
          categories: 'Categories',
          preview: 'Preview',
          download: 'Download',
          confirmation: 'Confirmation',
          organizationID: 'Organization ID',
          organizationName: 'Organization Name',
          organizationAddress: 'Organization Address',
          email: 'Email',
          telephone: 'Telephone',
          fax: 'Fax',
          website: 'Website',
          reportEndpoint: 'Report Endpoint',
          confirmSubmit: 'Confirm & Submit',
          pdfReport: 'PDF Report',
          noSupportPDF: 'This browser does not support PDFs. Please download the PDF to view it:',
          downloadPDF: 'Download PDF',
          xmlReport: 'XML Report',
          copyToClipboard: 'Copy to clipboard',
          name: 'Name',
          schedulesReport: 'Report Schedules',
          waiting: 'Waiting',
          failed: 'Failed',
          done: 'Done',
          newScheduleTask: 'New Schedule Task',
          updateMailReportTask: 'Update Mail Report Task',
          updateXMLReportTask: 'Update XML Report Task',
          task: 'Task',
          status: 'Status',
          nextExecutation: 'Next executation',
          repeating: 'Repeating',
          endding: 'Endding',
          action: 'Action'
        },
        schedule: {
          schedules: 'Schedules',
          waiting: 'Waiting',
          failed: 'Failed',
          done: 'Done',
          newScheduleTask: 'New Schedule Task',
          updateMailReportTask: 'Update Mail Report Task',
          updateThreatNotifyTask: 'Update Threat Notify Task',
          updateXMLReportTask: 'Update XML Report Task',
          task: 'Task',
          status: 'Status',
          nextExecutation: 'Next executation',
          repeating: 'Repeating',
          endding: 'Endding',
          action: 'Action'
        },
        configuration: {
          organizationInfo: 'Organization Info',
          agentsGroup: 'Agents Group',
          license: 'License',
          dashboardUser: 'Dashboard User',
          offlineUpdate: 'Offline Update'
        },
        configurationInfo: {
          info: 'Info',
          name: 'Name',
          group: 'Group',
          organizationInfo: 'Organization Info',
          endpoint: 'Endpoint',
          organizationID: 'Organization ID',
          organizationName: 'Organization Name',
          organizationAddress: 'Organization Address',
          email: 'Email',
          telephone: 'Telephone',
          fax: 'Fax',
          website: 'Website',
          reportEndpoint: 'Report Endpoint'
        },
        configurationGroup: {
          groups: 'Groups',
          name: 'Name',
          groupKey: 'Group Key',
          licenseKey: 'License Key',
          createLicense: 'Create a new license key for this group',
          netmask: 'Netmask',
          subnets: 'Subnets',
          agents: 'Agents',
          description: 'Description',
          groupName: 'Group Name',
          childGroups: 'Child Groups',
          count: 'Count',
          agentCount: 'Agent Count',
          action: 'Action',
          createNewGroup: 'Create New Group',
          editGroup: 'Edit Group'
        },
        configurationLicense: {
          licenses: 'Licenses',
          random: 'Random',
          licenseKey: 'License Key',
          agentGroups: 'Agent Groups',
          limit: 'Limit',
          countLimit: 'Count/Limit',
          limited: 'Limited',
          unlimited: 'Unlimited',
          agents: 'Agents'
        },
        user: {
          dashboardUsers: 'Dashboard Users',
          userName: 'Username',
          name: 'Name',
          type: 'Type',
          group: 'Group',
          oldPassword: 'Old Password',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          action: 'Action',
          createNewUser: 'Create New User',
          updateUser: 'Update User'
        },
        configurationUpdate: {
          agent: 'Agent',
          database: 'Database',
          offlineUpdate: 'Offline Update',
          agentUpdateFile: 'Agent Update File',
          dashboardUpdateFile: 'Database Update File',
          chooseAFile: 'Choose a file...',
          noFileChosen: 'No file chosen'
        },
        formSchedule: {
          nextExecution: 'Next Excution',
          repeatUnit: 'Repeat Unit',
          repeatInterval: 'Repeat Interval',
          ends: 'Ends',
          never: 'Never',
          occurrences: 'Occurrences',
          mailReport: 'Mail Report',
          threatNotify: 'Threat Notify',
          xmlReport: 'XML Report',
          minutes: 'Minute',
          hours: 'Hour',
          days: 'Day',
          weeks: 'Week',
          months: 'Month'
        },
        formScheduleThreatNotidy: {
          types: 'Types',
          priorities: 'Priorities'
        },
        formScheduleXmlReport: {
          types: 'Types',
          priorities: 'Priorities',
          group: 'Group'
        },
        download: {
          instructions: 'Instructions',
          howTo: 'How to install CyRadar Endpoint Detection & Response',
          step: 'Step',
          download: 'Download',
          installer: 'CyRadar EDR installer',
          doubleClick: 'Double click the recently downloaded file, the installer will start.',
          fillInfo: 'Fill the infomation as required',
          serverAddress: 'Server address',
          serverAddressExplain: "the address of the local CyRadar server. If there isn't any instructions from administrator, you can use",
          port: 'Server port',
          portExplain: "the port of the local CyRadar server. If there isn't any instructions from administrator, you can use",
          license: 'License',
          licenseExplain: 'the license code used to verify and classify agent. Contact your administrator for this.',
          contact: 'Contact',
          contactExplain: "(optional) The user's contact information.",
          pressInstall: 'Press the <strong>Install</strong> button.',
          beginToInstall: 'The installer will auto download required files and begin to install CyRadar EDR on the computer.',
          restartToComplete: 'Restart the computer to complete the installation.'
        },
        alert: {
          alerts: 'Alerts',
          recipients: 'Recipients',
          status: 'Status',
          waiting: 'Waiting',
          failed: 'Failed',
          action: 'Action',
          nextExecutation: 'Next executation',
          done: 'Done',
          newThreatNotifyTask: 'New Threat Notify Task',
          updateThreatNotifyTask: 'Update Threat Notify Task'
        },
        collector: {
          siem: 'SIEM',
          type: 'Type',
          endpoint: 'Endpoint',
          create: 'Create',
          updateSIEM: 'Update SIEM',
          header: 'Header',
          endpointIsEmpty: 'The endpoint is empty',
          endpointIsInvalid: 'The endpoint is invalid',
          headerIsEmpty: 'The header is empty',
          headerIsDuplicate: 'The header is duplicate',
          sendEvents: 'Send Events',
          send: 'Send',
          timeRange: 'Time Range'
        }
      }
    }
  }
}
