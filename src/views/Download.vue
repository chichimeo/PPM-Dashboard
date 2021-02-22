<template>
  <div>
    <nav
      role="navigation"
      aria-label="main navigation"
      class="navbar is-fixed-top has-shadow"
    >
      <div class="navbar-brand">
        <a
          href="#/"
          class="navbar-item router-link-active"
        ><img
          src="@/assets/logo.svg"
        ></a>
      </div>
      <div class="navbar-end mr-5">
        <div class="localization">
          <dropdown
            class="is-down"
            :open.sync="dropdown"
          >
            <a
              slot="v"
              class="button is-fullwidth language"
              aria-haspopup="true"
            >
              <img
                :src="language.icon"
                alt=""
              > {{ language.name }}
            </a>

            <a
              v-for="lang in languages"
              :key="lang.name"
              class="dropdown-item language"
              @click.prevent="localize(lang)"
            >
              <img
                :src="lang.icon"
                alt=""
              > {{ lang.name }}
            </a>
          </dropdown>
        </div>
      </div>
    </nav>
    <section
      class="hero is-fullheight"
      style="margin-top: 3.25rem;"
    >
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{ $l('components.download.instructions', 'Instructions') }}
          </h1>
          <box>
            <div slot="header">
              <div class="columns is-vcentered">
                <div class="column">
                  {{ $l('components.download.howTo', 'How to install CyRadar Endpoint Detection & Response') }}
                </div>
                <div class="column is-narrow">
                  <a
                    class="button is-info "
                    style="margin-right: 10px; height: 2.2em; font-weight: normal;"
                    href="/api/v1/view/download/agents/CyRadarEDRSetupOnline.exe"
                  >
                    {{ $l('components.login.downloadCyEDR') }}
                  </a>
                </div>
              </div>
            </div>
            <div>
              <strong>{{ $l('components.download.step', 'Step') }} 1: </strong>
              <span>
                {{ $l('components.download.download', 'Download') }} <a href="/api/v1/view/download/agents/CyRadarEDRSetupOnline.exe">{{ $l('components.download.installer', 'CyRadar EDR installer') }}</a>
              </span>
            </div>
            <div>
              <div>
                <strong>{{ $l('components.download.step', 'Step') }} 2: </strong>
                <span>{{ $l('components.download.doubleClick', 'Double click the recently downloaded file, the installer will start.') }}</span>
              </div>
              <img
                style="display:block; margin: auto; max-width: 500px;"
                src="@/assets/installer-01.png"
              >
              <div>{{ $l('components.download.fillInfo', 'Fill the infomation as required') }}:</div>
              <ul>
                <li>
                  <strong>{{ $l('components.download.serverAddress', 'Server address') }}: </strong>
                  {{ $l('components.download.serverAddressExplain', "the address of the local CyRadar server. If there isn't any instructions from administrator, you can use") }} "<strong>{{ hostname }}</strong>".
                </li>
                <li>
                  <strong>{{ $l('components.download.port', 'Port') }}: </strong>
                  {{ $l('components.download.portExplain', "the port of the local CyRadar server. If there isn't any instructions from administrator, you can use") }} "<strong>8181</strong>".
                </li>
                <li>
                  <strong>{{ $l('components.download.license', 'License') }}: </strong>
                  {{ $l('components.download.licenseExplain', "the license code used to verify and classify agent. Contact your administrator for this.") }}
                </li>
                <li>
                  <strong>{{ $l('components.download.contact', 'Contact') }}: </strong>
                  {{ $l('components.download.contactExplain', "(optional) The user's contact information.") }}
                </li>
              </ul>
            </div>
            <div>
              <strong>{{ $l('components.download.step', 'Step') }} 3: </strong>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="$t('components.download.pressInstall')" />
              <div>{{ $l('components.download.beginToInstall', 'The installer will auto download required files and begin to install CyRadar EDR on the computer.') }}</div>
            </div>
            <div>
              <strong>{{ $l('components.download.step', 'Step') }} 4: </strong>
              <span>{{ $l('components.download.restartToComplete', 'Restart the computer to complete the installation.') }}</span>
            </div>
          </box>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'Download',
  data () {
    return {
      dropdown: false
    }
  },
  computed: {
    hostname () {
      return window.location.hostname
    },
    language () {
      return this.$store.getters.currentLanguage
    },
    languages () {
      return this.$store.getters.languages.filter(language => {
        return language.locale !== this.language.locale
      }).slice()
    }
  },
  mounted () {
    this.localize({
      locale: 'vi',
      name: 'Tiếng Việt',
      icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgNDggNDgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDogbmV3IDAgMCA0OCA0ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8cmVjdCB4PSIyIiB5PSI5IiBzdHlsZT0iZmlsbDogI2QzMmYyZjsiIHdpZHRoPSI0NCIgaGVpZ2h0PSIzMCI+PC9yZWN0Pgo8cG9seWdvbiBzdHlsZT0iZmlsbDogI2ZmZWIzYjsiIHBvaW50cz0iMjcuMDU2LDI1LjU5MiAzMiwyMiAyNS44ODksMjIgMjQsMTYuMTg4IDIyLjExMSwyMiAxNiwyMiAyMC45NDQsMjUuNTkyIDE5LjA1NiwzMS40MDUgICAyNCwyNy44MTIgMjguOTQ0LDMxLjQwNSAiPjwvcG9seWdvbj4KPC9zdmc+'
    })
    // this.localize({
    //   locale: 'en',
    //   name: 'English',
    //   icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNDggNDgiIHZlcnNpb249IjEuMSI+CjxnPgo8cGF0aCBzdHlsZT0iIGZpbGw6ICNlY2VmZjE7IiBkPSJNIDEuOTk2MDk0IDEwIEwgNDUuOTk2MDk0IDEwIEwgNDUuOTk2MDk0IDM3IEwgMS45OTYwOTQgMzcgWiAiPjwvcGF0aD4KPHBhdGggc3R5bGU9IiBmaWxsOiAjZjQ0MzM2OyIgZD0iTSAyIDEwIEwgNDYgMTAgTCA0NiAxMyBMIDIgMTMgWiAiPjwvcGF0aD4KPHBhdGggc3R5bGU9IiBmaWxsOiAjZjQ0MzM2OyIgZD0iTSAyIDE2IEwgNDYgMTYgTCA0NiAxOSBMIDIgMTkgWiAiPjwvcGF0aD4KPHBhdGggc3R5bGU9IiBmaWxsOiAjZjQ0MzM2OyIgZD0iTSAyIDIyIEwgNDYgMjIgTCA0NiAyNSBMIDIgMjUgWiAiPjwvcGF0aD4KPHBhdGggc3R5bGU9IiBmaWxsOiAjZjQ0MzM2OyIgZD0iTSAyIDI4IEwgNDYgMjggTCA0NiAzMSBMIDIgMzEgWiAiPjwvcGF0aD4KPHBhdGggc3R5bGU9IiBmaWxsOiAjZjQ0MzM2OyIgZD0iTSAyIDM0IEwgNDYgMzQgTCA0NiAzNyBMIDIgMzcgWiAiPjwvcGF0aD4KPHBhdGggc3R5bGU9IiBmaWxsOiAjM2Y1MWI1OyIgZD0iTSAyIDEwIEwgMjMgMTAgTCAyMyAyNSBMIDIgMjUgWiAiPjwvcGF0aD4KPHBhdGggc3R5bGU9IiBmaWxsOiAjZmZmOyIgZD0iTSA0LjI1IDEyIEwgNC43MTQ4NDQgMTIuOTg4MjgxIEwgNS43NSAxMy4xNDQ1MzEgTCA1IDEzLjkxNDA2MyBMIDUuMTc5Njg4IDE1IEwgNC4yNSAxNC40ODgyODEgTCAzLjMyMDMxMyAxNSBMIDMuNSAxMy45MTQwNjMgTCAyLjc1IDEzLjE0NDUzMSBMIDMuNzg1MTU2IDEyLjk4ODI4MSBaICI+PC9wYXRoPgo8cGF0aCBzdHlsZT0iIGZpbGw6ICNmZmY7IiBkPSJNIDguMjUgMTIgTCA4LjcxNDg0NCAxMi45ODgyODEgTCA5Ljc1IDEzLjE0NDUzMSBMIDkgMTMuOTE0MDYzIEwgOS4xNzk2ODggMTUgTCA4LjI1IDE0LjQ4ODI4MSBMIDcuMzIwMzEzIDE1IEwgNy41IDEzLjkxNDA2MyBMIDYuNzUgMTMuMTQ0NTMxIEwgNy43ODUxNTYgMTIuOTg4MjgxIFogIj48L3BhdGg+CjxwYXRoIHN0eWxlPSIgZmlsbDogI2ZmZjsiIGQ9Ik0gMTIuMjUgMTIgTCAxMi43MTQ4NDQgMTIuOTg4MjgxIEwgMTMuNzUgMTMuMTQ0NTMxIEwgMTMgMTMuOTE0MDYzIEwgMTMuMTc5Njg4IDE1IEwgMTIuMjUgMTQuNDg4MjgxIEwgMTEuMzIwMzEzIDE1IEwgMTEuNSAxMy45MTQwNjMgTCAxMC43NSAxMy4xNDQ1MzEgTCAxMS43ODUxNTYgMTIuOTg4MjgxIFogIj48L3BhdGg+CjxwYXRoIHN0eWxlPSIgZmlsbDogI2ZmZjsiIGQ9Ik0gMTYuMjUgMTIgTCAxNi43MTQ4NDQgMTIuOTg4MjgxIEwgMTcuNzUgMTMuMTQ0NTMxIEwgMTcgMTMuOTE0MDYzIEwgMTcuMTc5Njg4IDE1IEwgMTYuMjUgMTQuNDg4MjgxIEwgMTUuMzIwMzEzIDE1IEwgMTUuNSAxMy45MTQwNjMgTCAxNC43NSAxMy4xNDQ1MzEgTCAxNS43ODUxNTYgMTIuOTg4MjgxIFogIj48L3BhdGg+CjxwYXRoIHN0eWxlPSIgZmlsbDogI2ZmZjsiIGQ9Ik0gMjAgMTIgTCAyMC40NjQ4NDQgMTIuOTg4MjgxIEwgMjEuNSAxMy4xNDQ1MzEgTCAyMC43NSAxMy45MTQwNjMgTCAyMC45Mjk2ODggMTUgTCAyMCAxNC40ODgyODEgTCAxOS4wNzAzMTMgMTUgTCAxOS4yNSAxMy45MTQwNjMgTCAxOC41IDEzLjE0NDUzMSBMIDE5LjUzNTE1NiAxMi45ODgyODEgWiAiPjwvcGF0aD4KPHBhdGggc3R5bGU9IiBmaWxsOiAjZmZmOyIgZD0iTSA0LjI1IDIwIEwgNC43MTQ4NDQgMjAuOTg4MjgxIEwgNS43NSAyMS4xNDQ1MzEgTCA1IDIxLjkxNDA2MyBMIDUuMTc5Njg4IDIzIEwgNC4yNSAyMi40ODgyODEgTCAzLjMyMDMxMyAyMyBMIDMuNSAyMS45MTQwNjMgTCAyLjc1IDIxLjE0NDUzMSBMIDMuNzg1MTU2IDIwLjk4ODI4MSBaICI+PC9wYXRoPgo8cGF0aCBzdHlsZT0iIGZpbGw6ICNmZmY7IiBkPSJNIDguMjUgMjAgTCA4LjcxNDg0NCAyMC45ODgyODEgTCA5Ljc1IDIxLjE0NDUzMSBMIDkgMjEuOTE0MDYzIEwgOS4xNzk2ODggMjMgTCA4LjI1IDIyLjQ4ODI4MSBMIDcuMzIwMzEzIDIzIEwgNy41IDIxLjkxNDA2MyBMIDYuNzUgMjEuMTQ0NTMxIEwgNy43ODUxNTYgMjAuOTg4MjgxIFogIj48L3BhdGg+CjxwYXRoIHN0eWxlPSIgZmlsbDogI2ZmZjsiIGQ9Ik0gMTIuMjUgMjAgTCAxMi43MTQ4NDQgMjAuOTg4MjgxIEwgMTMuNzUgMjEuMTQ0NTMxIEwgMTMgMjEuOTE0MDYzIEwgMTMuMTc5Njg4IDIzIEwgMTIuMjUgMjIuNDg4MjgxIEwgMTEuMzIwMzEzIDIzIEwgMTEuNSAyMS45MTQwNjMgTCAxMC43NSAyMS4xNDQ1MzEgTCAxMS43ODUxNTYgMjAuOTg4MjgxIFogIj48L3BhdGg+CjxwYXRoIHN0eWxlPSIgZmlsbDogI2ZmZjsiIGQ9Ik0gMTYuMjUgMjAgTCAxNi43MTQ4NDQgMjAuOTg4MjgxIEwgMTcuNzUgMjEuMTQ0NTMxIEwgMTcgMjEuOTE0MDYzIEwgMTcuMTc5Njg4IDIzIEwgMTYuMjUgMjIuNDg4MjgxIEwgMTUuMzIwMzEzIDIzIEwgMTUuNSAyMS45MTQwNjMgTCAxNC43NSAyMS4xNDQ1MzEgTCAxNS43ODUxNTYgMjAuOTg4MjgxIFogIj48L3BhdGg+CjxwYXRoIHN0eWxlPSIgZmlsbDogI2ZmZjsiIGQ9Ik0gMjAgMjAgTCAyMC40NjQ4NDQgMjAuOTg4MjgxIEwgMjEuNSAyMS4xNDQ1MzEgTCAyMC43NSAyMS45MTQwNjMgTCAyMC45Mjk2ODggMjMgTCAyMCAyMi40ODgyODEgTCAxOS4wNzAzMTMgMjMgTCAxOS4yNSAyMS45MTQwNjMgTCAxOC41IDIxLjE0NDUzMSBMIDE5LjUzNTE1NiAyMC45ODgyODEgWiAiPjwvcGF0aD4KPHBhdGggc3R5bGU9IiBmaWxsOiAjZmZmOyIgZD0iTSA1LjI1IDE2IEwgNS43MTQ4NDQgMTYuOTg4MjgxIEwgNi43NSAxNy4xNDQ1MzEgTCA2IDE3LjkxNDA2MyBMIDYuMTc5Njg4IDE5IEwgNS4yNSAxOC40ODgyODEgTCA0LjMyMDMxMyAxOSBMIDQuNSAxNy45MTQwNjMgTCAzLjc1IDE3LjE0NDUzMSBMIDQuNzg1MTU2IDE2Ljk4ODI4MSBaICI+PC9wYXRoPgo8cGF0aCBzdHlsZT0iIGZpbGw6ICNmZmY7IiBkPSJNIDkuMjUgMTYgTCA5LjcxNDg0NCAxNi45ODgyODEgTCAxMC43NSAxNy4xNDQ1MzEgTCAxMCAxNy45MTQwNjMgTCAxMC4xNzk2ODggMTkgTCA5LjI1IDE4LjQ4ODI4MSBMIDguMzIwMzEzIDE5IEwgOC41IDE3LjkxNDA2MyBMIDcuNzUgMTcuMTQ0NTMxIEwgOC43ODUxNTYgMTYuOTg4MjgxIFogIj48L3BhdGg+CjxwYXRoIHN0eWxlPSIgZmlsbDogI2ZmZjsiIGQ9Ik0gMTMuMjUgMTYgTCAxMy43MTQ4NDQgMTYuOTg4MjgxIEwgMTQuNzUgMTcuMTQ0NTMxIEwgMTQgMTcuOTE0MDYzIEwgMTQuMTc5Njg4IDE5IEwgMTMuMjUgMTguNDg4MjgxIEwgMTIuMzIwMzEzIDE5IEwgMTIuNSAxNy45MTQwNjMgTCAxMS43NSAxNy4xNDQ1MzEgTCAxMi43ODUxNTYgMTYuOTg4MjgxIFogIj48L3BhdGg+CjxwYXRoIHN0eWxlPSIgZmlsbDogI2ZmZjsiIGQ9Ik0gMTcuMjUgMTYgTCAxNy43MTQ4NDQgMTYuOTg4MjgxIEwgMTguNzUgMTcuMTQ0NTMxIEwgMTggMTcuOTE0MDYzIEwgMTguMTc5Njg4IDE5IEwgMTcuMjUgMTguNDg4MjgxIEwgMTYuMzIwMzEzIDE5IEwgMTYuNSAxNy45MTQwNjMgTCAxNS43NSAxNy4xNDQ1MzEgTCAxNi43ODUxNTYgMTYuOTg4MjgxIFogIj48L3BhdGg+CjxwYXRoIHN0eWxlPSIgZmlsbDogI2ZmZjsiIGQ9Ik0gMjEgMTYgTCAyMS40NjQ4NDQgMTYuOTg4MjgxIEwgMjIuNSAxNy4xNDQ1MzEgTCAyMS43NSAxNy45MTQwNjMgTCAyMS45Mjk2ODggMTkgTCAyMSAxOC40ODgyODEgTCAyMC4wNzAzMTMgMTkgTCAyMC4yNSAxNy45MTQwNjMgTCAxOS41IDE3LjE0NDUzMSBMIDIwLjUzNTE1NiAxNi45ODgyODEgWiAiPjwvcGF0aD4KPC9nPgo8L3N2Zz4='
    // })
  },
  methods: {
    localize (language) {
      this.dropdown = false
      this.$store.dispatch('LOCALIZE', language)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .navbar .dropdown.is-right .dropdown-menu {
  right: 0;
  min-width: 0;
  width: 100%;
}

.navbar-end {
  width: 10rem;
}

.localization {
  display: flex;
  align-items: center;
  border-top: 0;
  width: 100%;
}

ul {
  display: block;
  list-style-type: disc;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
</style>
