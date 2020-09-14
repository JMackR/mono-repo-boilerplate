import React from "react"
import { StyleSheet, css } from "aphrodite/no-important"
import { SliderProps } from "./slider.props"
import { Margin } from "../layout"
import { useState } from "react"
import { SliderThumb } from "./slider-thumb"
import {
  Slider as RNSlider,
  Rail,
  Handles,
  Ticks,
  Tracks,
  HandlesObject,
  TracksObject,
  TicksObject,
  RailObject,
} from "react-compound-slider"
import { useColor } from "../../themes/hooks"

enum LAYTS {
  TicSideMargin = 3,
  BottomMargin = 4,
  TopMargin = 17,
  HorizontalMargin = 10,
  ThumbSize = 120,
  ThumbOffsetTop = -48,
  ThumbOffsetLeft = -60,
  TrackClickAreaHeight = 20,
  TrackHeight = 2,
  TrackTopPadding = 9, // (TrackClickAreaHeight - TrackHeight) / 2
}

const Slider = (props: SliderProps) => {
  const { options, initialIndex, onIndexChanged } = props

  const [selectedIndex, setSelectedIndex] = useState(initialIndex ? initialIndex : 0)
  const { colors } = useColor()

  const styles = StyleSheet.create({
    railContainer: {
      position: "absolute",
      width: "100%",
      height: LAYTS.TrackClickAreaHeight,
      cursor: "pointer",
    },
    rail: {
      position: "absolute",
      top: LAYTS.TrackTopPadding,
      width: "100%",
      height: LAYTS.TrackHeight,
      borderRadius: 1,
      backgroundColor: colors.limestone,
    },
    track: {
      position: "absolute",
      top: LAYTS.TrackTopPadding,
      height: LAYTS.TrackHeight,
      zIndex: 1,
      backgroundColor: colors.green,
      borderRadius: 1,
      cursor: "pointer",
    },
    tick: {
      position: "absolute",
      height: 4,
      width: 1,
      backgroundColor: colors.basalt,
    },
    thumb: {
      cursor: "pointer",
      position: "absolute",
      zIndex: 2,
      width: LAYTS.ThumbSize,
      height: LAYTS.ThumbSize,
      marginTop: LAYTS.ThumbOffsetTop,
      marginLeft: LAYTS.ThumbOffsetLeft,
    },
  })

  const onChange = (value: readonly number[]) => {
    if (value[0] === undefined) {
      return
    }
    if (onIndexChanged) {
      onIndexChanged(value[0])
    }
    setSelectedIndex(value[0])
  }

  const renderRail = (railObject: RailObject) => (
    <div {...railObject.getRailProps()} className={css(styles.railContainer)}>
      <div className={css(styles.rail)} />
    </div>
  )

  const renderTrack = (tracksObject: TracksObject) => (
    <div>
      {tracksObject.tracks.map((trackItem) => (
        <div
          {...tracksObject.getTrackProps()}
          key={trackItem.id}
          className={css(styles.track)}
          style={{
            left: `${trackItem.source.percent}%`,
            width: `${trackItem.target.percent - trackItem.source.percent}%`,
          }}
        />
      ))}
    </div>
  )

  const tickValues = options.map((_, index) => index)

  const renderTicks = (ticksObject: TicksObject) => (
    <div>
      {ticksObject.ticks.map((tick) => (
        <div
          key={tick.id}
          className={css(styles.tick)}
          style={{
            left: `${tick.percent}%`,
          }}
        />
      ))}
    </div>
  )

  const renderThumb = (handlesObject: HandlesObject) => (
    <div>
      {handlesObject.handles.map((handle) => (
        <div
          {...handlesObject.getHandleProps(handle.id)}
          key={handle.id}
          className={css(styles.thumb)}
          style={{
            left: `${handle.percent}%`,
          }}
        >
          <SliderThumb label={options[handle.value]} />
        </div>
      ))}
    </div>
  )

  return (
    <Margin
      direction="column"
      marginLeftStep={LAYTS.HorizontalMargin}
      marginRightStep={LAYTS.HorizontalMargin}
      marginTopStep={LAYTS.TopMargin}
      marginBottomStep={LAYTS.BottomMargin}
      grow={1}
    >
      <RNSlider onChange={onChange} mode={1} step={1} domain={[0, options.length - 1]} values={[selectedIndex]}>
        <Rail>{renderRail}</Rail>
        <Tracks right={false}>{renderTrack}</Tracks>
        <Ticks values={tickValues}>{renderTicks}</Ticks>
        <Handles>{renderThumb}</Handles>
      </RNSlider>
    </Margin>
  )
}

export { Slider }
