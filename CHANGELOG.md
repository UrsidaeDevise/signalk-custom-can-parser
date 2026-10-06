# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]
### Prio 1
- Fix installation
- Reliable operation
### Prio 2
- GUI for new message
- Better guide

## [0.6.6] - 2026-10-06
### Fixed
- Install?
### Added
- Icon and screenshot

## [0.6.2-5] - 2026-10-06

### Fixed
- Trying to fix installation properly, node gyp rebuild stuff

### Added
- Adding Changelog.md now
- Added workflow ci
- Added third sensor and re-named them to 0x6A0/6A3/6A6, Current_alt/Current_batt/Current

## [0.6.1] - 2026-05-19

### Fixed
- Republish the webapp release from the completed `main` branch.

## [0.6.0] - 2026-05-19

### Added
- Add a Signal K webapp for live attitude calibration and pitch/roll zeroing.
- Add plugin API routes for live state, offset updates and zero calibration.
- Add webapp source mode configuration with a selector populated from observed attitude sources.
- Point the Signal K plugin configuration panel to the richer calibration webapp.
- Add an attitude-instrument icon for the webapp using Signal K's `appIcon` metadata.

## [0.5.0] - 2026-05-19

### Changed
- Replace the separate no-source-filter mode and source filter fields with a single Source mode selector: all sources, preferred source only, or specific source.
- Show the specific source field only when Source mode is set to `Specific source`.
- Keep compatibility with existing `sourceFilter` and `noSourceFilterMode` configurations.

## [0.4.0] - 2026-05-18

### Added
- Add a no-source-filter source mode: calibrate all `navigation.attitude` sources, or only the Signal K preferred source.

### Changed
- When a source filter is configured, the plugin always subscribes with `sourcePolicy: 'all'` so the selected non-preferred source can still be received.


## [0.6.0] - 2026-09-21

### Fixed
- Added correct bit shift, java script does not to the AND (&) operator correct for 32 bit unsigned number, resulting it becoming negative in some cases.

## [0.5.5] - 2026-09-20

### Added
- Added second sensor, Current2

### Changed
- 

## [0.5.4] - 2026-04-26
Prototype working 


### Added
- Initial release: 
