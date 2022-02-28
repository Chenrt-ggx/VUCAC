from src import processor


def run():
    masks = processor.process_read('mask', './src/assets/masks')
    backgrounds = processor.process_read('background', './src/assets/backgrounds')
    name_map = processor.process_merge(masks, backgrounds, './src/assets/merge_', 'jpg')
    processor.process_splice(masks, backgrounds, 'pc', name_map, {
        'suffix': 'jpg',
        'prefix': 'splice',
        'directory': './src/assets/p_display'
    })
    processor.process_splice(masks, backgrounds, 'mobile', name_map, {
        'suffix': 'jpg',
        'prefix': 'splice',
        'directory': './src/assets/m_display'
    })


if __name__ == '__main__':
    run()
