module.exports = {
  expandProps: "end",
  svgo: false,
  replaceAttrValues: {
    // In React.js all props forwarded to the <svg> tag must be lowercase only.

    // Color Palette props pulled from OUColors for themed multi-color svgs.
    palouseGreen: "{props.palousegreen}",
    palouseGreenHover: "{props.palousegreenhover}",
    palouseGreenPressed: "{props.palousegreenpressed}",
    palouseGreenHighlight: "{props.palousegreenhighlight}",
    larchYellow: "{props.larchyellow}",
    larchYellowHover: "{props.larchyellowhover}",
    larchYellowPressed: "{props.larchyellowpressed}",
    glacialBlue: "{props.glacialblue}",
    paintbrushRed: "{props.paintbrushred}",
    obsidian: "{props.obsidian}",
    basalt: "{props.basalt}",
    granite: "{props.granite}",
    limestone: "{props.limestone}",
    limestoneHover: "{props.limestonehover}",
    limestonePressed: "{props.limestonepressed}",
    quartz: "{props.quartz}",
    crystal: "{props.crystal}",
    crystalHover: "{props.crystalhover}",
    crystalPressed: "{props.crystalpressed}",
    disabled: "{props.disabled}",
    alwaysDark: "{props.alwaysdark}",
    alwaysLight: "{props.alwayslight}",
    overlay: "{props.overlay}",

    // Tint color props for mono-color svgs.
    tintColor: "{props.tintcolor}",
  },
}
